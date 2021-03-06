use anyhow::{bail, Context as _, Result};
use object::write::Object;
use target_lexicon::Triple;
use wasmtime::Strategy;
#[cfg(feature = "lightbeam")]
use wasmtime_environ::Lightbeam;
use wasmtime_environ::{settings, settings::Configurable, ModuleEnvironment, Tunables};
use wasmtime_jit::{native, Compiler};

/// Creates object file from binary wasm data.
pub fn compile_to_obj(
    wasm: &[u8],
    target: Option<&Triple>,
    strategy: Strategy,
    enable_simd: bool,
    opt_level: wasmtime::OptLevel,
    debug_info: bool,
) -> Result<Object> {
    let isa_builder = match target {
        Some(target) => native::lookup(target.clone())?,
        None => native::builder(),
    };
    let mut flag_builder = settings::builder();

    // There are two possible traps for division, and this way
    // we get the proper one if code traps.
    flag_builder.enable("avoid_div_traps").unwrap();

    if enable_simd {
        flag_builder.enable("enable_simd").unwrap();
    }

    match opt_level {
        wasmtime::OptLevel::None => {}
        wasmtime::OptLevel::Speed => {
            flag_builder.set("opt_level", "speed").unwrap();
        }
        wasmtime::OptLevel::SpeedAndSize => {
            flag_builder.set("opt_level", "speed_and_size").unwrap();
        }
        other => bail!("unknown optimization level {:?}", other),
    }

    let isa = isa_builder.finish(settings::Flags::new(flag_builder));

    // TODO: Expose the tunables as command-line flags.
    let mut tunables = Tunables::default();
    tunables.debug_info = debug_info;

    let compiler = Compiler::new(
        isa,
        match strategy {
            Strategy::Auto => wasmtime_jit::CompilationStrategy::Auto,
            Strategy::Cranelift => wasmtime_jit::CompilationStrategy::Cranelift,
            #[cfg(feature = "lightbeam")]
            Strategy::Lightbeam => wasmtime_jit::CompilationStrategy::Lightbeam,
            #[cfg(not(feature = "lightbeam"))]
            Strategy::Lightbeam => bail!("lightbeam support not enabled"),
            s => bail!("unknown compilation strategy {:?}", s),
        },
        tunables.clone(),
    );

    let environ = ModuleEnvironment::new(compiler.isa().frontend_config(), &tunables);
    let translation = environ
        .translate(wasm)
        .context("failed to translate module")?;
    let compilation = compiler.compile(&translation)?;
    Ok(compilation.obj)
}
