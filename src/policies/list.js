const ApplicationPolicy = require("./application");

module.exports = class ListPolicy extends ApplicationPolicy {

  new() {
    return this._isMember();
  }

  create() {
    return this.new();
  }

  edit() {
    return this._isMember();
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }
}
