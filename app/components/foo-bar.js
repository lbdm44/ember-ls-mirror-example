import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  flagging: service('is-flagged'),

  isFlagged: computed('foo.id', 'flagging.flags.@each', function() {
    let flags = this.get('flagging.flags');
    let key = this.get('foo.id');

    return flags.includes(key);
  }).readOnly(),

  actions: {
    toggle() {
      let isFlagged = this.get('isFlagged');
      let key = this.get('foo.id');
      let flagging = this.get('flagging');

      if (isFlagged) {
        flagging.removeFlag(key);
      } else {
        flagging.setFlag(key);
      }
    },
  },
});
