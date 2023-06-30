import * as Yup from 'yup';

const Login_Schema = Yup.object({
    email : Yup.string().email().required("Please Enter Valid email"),
    password : Yup.string().min(6).required("Please Enter Valid password"),
});

export default Login_Schema;