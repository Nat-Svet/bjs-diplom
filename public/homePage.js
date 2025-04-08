let logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        } else {
            console.error('Ошибка деавторизации:', response.error);
        }
    });
};


ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    } else {
        console.error("Ошибка получения данных текущего пользователя:", response.error);
    }
});


let ratesBoard = new RatesBoard();
function updateRates() {
    ApiConnector.getRates((response) => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        } else {
            console.error("Ошибка получения курсов валют:", response.error);
        }
    });
}
updateRates();
setInterval(updateRates, 60000);

let moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(isSuccess, "Баланс успешно пополнен!");
        } else {
            moneyManager.setMessage(isSuccess, "Ошибка пополнения баланса: " + response.error);
        }
    });
};

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(isSuccess, "Конвертация выполнена успешно!");
        } else {
            moneyManager.setMessage(isSuccess, "Ошибка конвертации валюты: " + response.error);
        }
    });
};

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(isSuccess, "Перевод выполнен успешно!");
        } else {
            moneyManager.setMessage(isSuccess, "Ошибка перевода валюты: " + response.error);
        }
    });
};

let favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites((response) => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        favoritesWidget.updateUsersList(response.data);
    } else {
        favoritesWidget.setMessage(isSuccess, "Ошибка получения списка избранного:", response.error);
    }
});


favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            ApiConnector.getFavorites((response) => {
                if (response.success) {
                    favoritesWidget.clearTable();
                    favoritesWidget.fillTable(response.data);
                    favoritesWidget.updateUsersList(response.data);
                    favoritesWidget.setMessage(isSuccess, "Пользователь успешно добавлен в избранное!");
                } else {
                    favoritesWidget.setMessage(isSuccess, "Ошибка обновления списка избранного: " + response.error);
                }
            });
        } else {
            favoritesWidget.setMessage(isSuccess, "Ошибка добавления пользователя в избранное: " + response.error);
        }
    });
};


favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            ApiConnector.getFavorites((response) => {
                if (response.success) {
                    favoritesWidget.clearTable();
                    favoritesWidget.fillTable(response.data);
                    favoritesWidget.updateUsersList(response.data);
                    favoritesWidget.setMessage(isSuccess, "Пользователь успешно удален из избранного!");
                } else {
                    favoritesWidget.setMessage(isSuccess, "Ошибка обновления списка избранного: " + response.error);
                }
            });
        } else {
            favoritesWidget.setMessage(isSuccess, "Ошибка удаления пользователя из избранного: " + response.error);
        }
    });
};