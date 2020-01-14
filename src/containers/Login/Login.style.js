const styles = {
  outerContainer: {
    display: 'flex',
    flex: 1,
    height: '100vh',
    width: '100vw',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 5,
    alignItems: 'center',
    background: 'white',
  },
  inputSection: {
    padding: '0.8em 1em ',
    width: 250,
  },
  buttonSection: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButton: {
    textDecoration: 'none',
    width: '100%',
    backgroundColor: 'deeppink',
    padding: 10,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 5,
  },
  formLabel: {
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  forgotPassBtn: {
    textDecoration: 'none',
    marginTop: 10,
    marginBottom: 20,
    color: 'black',
    fontSize: 14,
  },
};

export default styles;
