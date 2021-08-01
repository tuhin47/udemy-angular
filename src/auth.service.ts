export class AuthService{
  loggedIn = false;

  isAuthenticated() {
    return  new Promise(
      ((resolve, reject) => {
        setTimeout(() => resolve(this.loggedIn), 4000);
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
