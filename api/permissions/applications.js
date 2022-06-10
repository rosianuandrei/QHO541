const AccessControl = require('role-acl');

const ac = new AccessControl();

ac.grant('user').condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('update').on('application');
ac.grant('user').condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('read').on('applications');

ac.grant('admin').execute('update').on('application');
ac.grant('admin').execute('delete').on('application');
ac.grant('admin').execute('read').on('application');
ac.grant('admin').execute('read').on('applications');


exports.update = (requester, data) => ac.can(requester.role).context({requester:requester.id, owner:data.userid}).execute('update').sync().on('application');
exports.delete = (requester) => ac.can(requester.role).execute('delete').sync().on('application');
exports.readAll = (requester) => ac.can(requester.role).execute('read').sync().on('application');
exports.read = (requester, data) => ac.can(requester.role).context({requester:requester.id, owner:data.userid}).execute('read').sync().on('applications');