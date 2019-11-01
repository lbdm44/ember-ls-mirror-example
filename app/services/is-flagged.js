import Service from "@ember/service";

export default Service.extend({
  init() {
    this._super(...arguments);

    const entry = this._getLocalStorageItem();
    const flags = entry ? entry.split(',').map(Number) : [];
    this.set("flags", flags);
  },

  setFlag(key) {
    const flags = this.get("flags");

    if (flags.includes(key)) {
      alert(`key ${key} already exists`);
    } else {
      flags.pushObject(key);
      this._updateLocalStorageItem();
    }
  },

  removeFlag(key) {
    let flags = this.get("flags");

    if (!flags.includes(key)) {
      alert(`key ${key} is not flagged`);
    } else {
      const idx = flags.indexOf(key);
      // flags.splice(idx, 1);
      flags.removeAt(idx)
      this._updateLocalStorageItem();
    }
  },

  _getLocalStorageItem() {
    return window.localStorage.getItem("my-flags");
  },

  _updateLocalStorageItem() {
    const flags = this.get("flags");
    window.localStorage.setItem("my-flags", flags.join());
  }
});
