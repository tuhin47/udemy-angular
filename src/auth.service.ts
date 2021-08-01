export class AuthService{
  loggedIn = false;

  isAuthenticated() {
    return  new Promise(
      ((resolve, reject) => {
        setTimeout(() => resolve(this.loggedIn), 500);
      })
    )

  }
  logIn(){
    this.loggedIn = true;
  }
  logOut() {
    this.loggedIn = false;
  }

}
