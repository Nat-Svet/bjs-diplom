let userForm = new UserForm();
userForm.loginFormCallback = function (data) {
  ApiConnector.login(data, (response) => {
    if (response.success) {
      setLoginSuccessMessage('Авторизация успешна!');
      location.reload();
    } else {
      setLoginErrorMessage(`Ошибка: ${response.error}`);
    }
  });
};
userForm.registerFormCallback = function (data) {
  ApiConnector.register(data, (response) => {
    if (response.success) {
      setRegisterSuccessMessage('Регистрация успешна!');
      location.reload();
    } else {
      setRegisterErrorMessage(`Ошибка: ${response.error}`);
    }
  });
};

  