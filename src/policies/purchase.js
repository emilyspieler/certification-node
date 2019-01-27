const ApplicationPolicy = require("./application");

module.exports = class PurchasePolicy extends ApplicationPolicy {
  destroy(){
    return this._isOwner();
  }
}
