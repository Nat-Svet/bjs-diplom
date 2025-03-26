class UserForm {
    constructor() {
      this.loginFormCallback = null;
      this.registerFormCallback = null;
    }
  }
  
  
  let userForm = new UserForm();
  userForm.loginFormCallback = function (data) {
    ApiConnector.login(data, (response) => {
      if (response.success) {
        console.log("Авторизация успешна:", response);
        location.reload();
      } else {
        console.error("Ошибка авторизации:", response.error);
        alert(`Ошибка: ${response.error}`);
      }
    });
  };
     userForm.registerFormCallback = function(data) {
      ApiConnector.register(data, (response) => {
      if (response.success) {
         console.log("Регистрация успешна:", response);
         location.reload();
       } else {
         console.error("Ошибка регистрации:", response.error);
         alert(`Ошибка: ${response.error}`);
       }
      });
    };
  