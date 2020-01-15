const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const validation = {
    isEmail:(email) => emailRegex.test(email),
    isValidPassword:(password) => password.length >= 8
}

export default validation;