# to do list

## react-hook-form

0. react-hook-form 없을 때

   ```typescript
   import React, { useState } from "react";

   export default function ToDoList() {
     const [value, setValue] = useState("");
     const onChange = (event: React.FormEvent<HTMLInputElement>) => {
       const {
         currentTarget: { value },
       } = event;
       setValue(value);
     };
     const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
       event.preventDefault();
       console.log(value);
     };
     return (
       <div>
         <form onSubmit={onSubmit}>
           <input value={value} onChange={onChange} placeholder="Write a to do" />
           <button>Add</button>
         </form>
       </div>
     );
   }
   ```

1. register, watch, handleSubmit, formState, setError

   ```typescript
   import { useForm } from "react-hook-form";

   interface iForm {
     email: string;
     name: string;
     id: string;
     password: string;
     extraForm?: string;
   }

   export default function ToDoList() {
     const {
       register,
       watch,
       handleSubmit,
       formState: { errors },
       setError,
     } = useForm<iForm>();
     const onValid = (data: iForm) => {
       if (data.id === "msw") {
         setError(
           "id",
           { message: "이미 존재하는 아이디입니다." },
           { shouldFocus: true }
         ); // custom validation
       }
       // setError("extraForm", { message: "server error" });
     };

     // 설정해둔 message는 에러 발생 시 formSate.erros.[register_key].message로 들어간다!!!

     return (
       <div>
         <form onSubmit={handleSubmit(onValid)}>
           <input
             {...register("email", {
               required: true,
               pattern: {
                 value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                 message: "naver.com 주소만 가능합니다.",
               },
               // validate: { hello: (v) => v === "hello" ? "message" : true },
             })}
             placeholder="email"
           />
           <span>{errors?.email?.message}</span>

           <input
             {...register("name", {
               required: true,
               minLength: { value: 5, message: "이름을 더 길게 해주세요." },
             })}
             placeholder="name"
           />

           <input {...register("id", { required: true })} placeholder="id" />
           <span>{errors?.id?.message}</span>

           <input {...register("password", { required: true })} placeholder="password" />

           <button>Add</button>
         </form>
       </div>
     );
   }
   ```
