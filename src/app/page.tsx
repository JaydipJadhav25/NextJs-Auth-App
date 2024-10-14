import Image from "next/image";
// import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'; 

const secretKey = "superMan@123";


// export async function getServerSideProps(context : any) { 
//   const token = context.req?.cookies.token; // Assuming the token is stored in cookies

//   try {
//     const decoded = jwt.verify(token, secretKey);
//     console.log("user : " , decoded);

//     return {
//       props :{
//         user : decoded
//       }
//     }

//   } catch (error) {
//     return {
//       props: {},
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },

    
//   }

// }

// }

export default function Home() {
  // const token = request.cookies.get("token")?.value || "";

  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  const user = jwt.verify(token || "" ,secretKey );



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    {
      token &&
      JSON.stringify(user)
    }
    </main>
  );
}
