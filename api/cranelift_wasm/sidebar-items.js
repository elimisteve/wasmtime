initSidebarItems({"constant":[["VERSION","Version number of this crate."]],"enum":[["GlobalInit","Globals are initialized via the `const` operators or by referring to another import."],["GlobalVariable","The value of a WebAssembly global variable."],["ReturnMode","How to return from functions."],["TableElementType","WebAssembly table element. Can be a function or a scalar type."],["WasmError","A WebAssembly translation error."],["WasmType","WebAssembly value type -- equivalent of `wasmparser`'s Type."]],"fn":[["get_vmctx_value_label","Special VMContext value label. It is tracked as 0xffff_fffe label."],["translate_module","Translate a sequence of bytes forming a valid Wasm binary into a list of valid Cranelift IR `Function`."]],"macro":[["wasm_unsupported","Return an `Err(WasmError::Unsupported(msg))` where `msg` the string built by calling `format!` on the arguments to this macro."]],"struct":[["DataIndex","Index type of a passive data segment inside the WebAssembly module."],["DefinedFuncIndex","Index type of a defined function inside the WebAssembly module."],["DefinedGlobalIndex","Index type of a defined global inside the WebAssembly module."],["DefinedMemoryIndex","Index type of a defined memory inside the WebAssembly module."],["DefinedTableIndex","Index type of a defined table inside the WebAssembly module."],["DummyEnvironment","This `ModuleEnvironment` implementation is a \"naïve\" one, doing essentially nothing and emitting placeholders when forced to. Don't try to execute code translated for this environment, essentially here for translation debug purposes."],["ElemIndex","Index type of a passive element segment inside the WebAssembly module."],["FuncIndex","Index type of a function (imported or defined) inside the WebAssembly module."],["FuncTranslationState","Contains information passed along during a function's translation and that records:"],["FuncTranslator","WebAssembly to Cranelift IR function translator."],["FunctionBuilder","Temporary object used to build a single Cranelift IR `Function`."],["Global","A WebAssembly global."],["GlobalIndex","Index type of a global variable (imported or defined) inside the WebAssembly module."],["Memory","WebAssembly linear memory."],["MemoryIndex","Index type of a linear memory (imported or defined) inside the WebAssembly module."],["ModuleTranslationState","Contains information decoded from the Wasm module that must be referenced during each Wasm function's translation."],["SignatureIndex","Index type of a signature (imported or defined) inside the WebAssembly module."],["Table","WebAssembly table."],["TableIndex","Index type of a table (imported or defined) inside the WebAssembly module."],["WasmFuncType","WebAssembly function type -- equivalent of `wasmparser`'s FuncType."]],"trait":[["FuncEnvironment","Environment affecting the translation of a single WebAssembly function."],["ModuleEnvironment","An object satisfying the `ModuleEnvironment` trait can be passed as argument to the `translate_module` function. These methods should not be called by the user, they are only for `cranelift-wasm` internal use."],["TargetEnvironment","Environment affecting the translation of a WebAssembly."]],"type":[["WasmResult","A convenient alias for a `Result` that uses `WasmError` as the error type."]]});