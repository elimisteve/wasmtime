(module
  (memory 1)
  (func $main (local i32)
    (i32.store (i32.const 0) (i32.const 0x0))
    (if (i32.load (i32.const 0))
        (then (i32.store (i32.const 0) (i32.const 0xa)))
        (else (i32.store (i32.const 0) (i32.const 0xb))))
  )
  (start $main)
  (data (i32.const 0) "0000")
)