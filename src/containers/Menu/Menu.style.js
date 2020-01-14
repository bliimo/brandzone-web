import palette from '../../constants/colors';

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'lightgray',
    minWidth: '220px',
    maxWidth: '220px',
    minHeight: '100vh',
  },
  label: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 30,
    marginTop: 30,
  },
  menuItems: {
    display: 'flex',
    flexDirection: 'column',
  },
  navLink: {
    color: 'black',
    fontWeight: '600',
    letterSpacing: 1.2,
    textDecoration: 'none',
    paddingLeft: 20,
    fontSize: '0.9rem',
    paddingTop: 15,
    paddingBottom: 10,
    display: 'flex',
    borderTop: '1px solid gray',
    opacity: 0.8,
  },
  activeNavLink: {
    fontSize: '0.9rem',
    letterSpacing: 1.8,
    fontWeight: '800',
    backgroundColor: 'pink',
    opacity: 1,
  },
  arrow: {
    flex: 1,
    paddingLeft: 15,
  },
  activeSettingsNavLink: {
    fontSize: '0.7rem',
    letterSpacing: 1.8,
    fontWeight: 'bold',
    backgroundColor: palette.purple,
    opacity: 1,
  },
  hidden: {
    display: 'none',
  },
  logoutBtn: {
    color: 'deeppink',
    paddingLeft: 20,
    letterSpacing: 1.2,
    fontSize: '0.9rem',
    marginTop: 15,
    paddingTop: 15,
    paddingBottom: 10,
    display: 'flex',
  },
};

export default styles;
