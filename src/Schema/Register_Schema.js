import * as Yup from 'yup';

const Register_Schema = Yup.object({
    firstname : Yup.string().min(2).max(15).required("Please Enter Valid First name"),
    lastname : Yup.string().min(2).max(15).required("Please Enter Valid Last name"),
    email : Yup.string().email().required("Please Enter Valid email"),
    password : Yup.string().min(6).required("Please Enter Valid password"),
    cnf_password : Yup.string().required().oneOf([Yup.ref("password"), null], "Password must match"),
});

export default Register_Schema;