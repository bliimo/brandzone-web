const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

const validation = {
  isEmail: email => emailRegex.test(email),
  isValidPassword: password => password.length >= 8,
  isUrl: url => urlRegex.test(url)
};

export default validation;
