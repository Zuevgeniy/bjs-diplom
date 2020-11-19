'use strict'

const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout(response => response.success && (location.reload()));
};

const ratesBoard = new RatesBoard();

ApiConnector.current(response => response.success && (ProfileWidget.showProfile(response.data)));

function exchangeRates() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        };
    });
};

exchangeRates();
setInterval(() => exchangeRates(), 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Счет пополнен");
        } else {
            moneyManager.setMessage(response.success, response.error);
        };
    });
};

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Сумма конвертирована");
        } else {
            moneyManager.setMessage(response.success, response.error);
        };
    });
};

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Сумма переведена");
        } else {
            moneyManager.setMessage(response.success, response.error);
        };
    });
};

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    } else {
        favoritesWidget.setMessage(response.error);
    };
});

favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Пользователь добавлен");
        } else {
            favoritesWidget.setMessage(response.success, response.error)
        };
    });
};

favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Пользователь удален");
        } else {
            favoritesWidget.setMessage(response.success, response.error)
        };
    });
};
i
