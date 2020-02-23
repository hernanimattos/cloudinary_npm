const call_account_api = require('../api_client/call_account_api');

/**
 * @desc Returns an array of all sub-accounts, or if conditions are specified, return the relevant sub-accounts.
 * @param [enabled] {boolean} - Whether to only return enabled sub-accounts (true) or disabled accounts (false). Default: all accounts are returned (both enabled and disabled).
 * @param [ids] {number[]} - A list of up to 100 sub-account IDs. When provided, other parameters are ignored.
 * @param [prefix] {string} - Returns accounts where the name begins with the specified case-insensitive string.
 * @param [options] {object} - @see <a href="https://cloudinary.com/documentation/cloudinary_sdks#configuration_parameters" target="_blank">Configuration parameters</a> in the SDK documentation.
 * @param [callback] {function}
 */
function sub_accounts(enabled, ids = [], prefix, options = {}, callback) {
  let params = {
    enabled,
    ids,
    prefix,
  };

  let uri = ['sub_accounts'];
  return call_account_api('GET', uri, params, callback, options);
}


/**
 * @desc Returns the specified sub-account.
 * @param sub_account_id {string} - The ID of the sub-account to get.
 * @param [options] {object} - @see <a href="https://cloudinary.com/documentation/cloudinary_sdks#configuration_parameters" target="_blank">Configuration parameters</a> in the SDK documentation.
 * @param [callback] {function}
 */
function sub_account(sub_account_id, options = {}, callback) {
  let uri = ['sub_accounts', sub_account_id];
  return call_account_api('GET', uri, {}, callback, options);
}


/**
 * @desc Creates a new sub-account. Any users that have access to all sub-accounts will also automatically have access to the new sub-account.
 * @param name {string} The display name as shown in the management console.
 * @param cloud_name {string} A case-insensitive cloud name comprised of alphanumeric and underscore characters. Generates an error if the specified cloud name is not unique across all Cloudinary accounts. Note: Once created, the name can only be changed for accounts with fewer than 1000 assets.
 * @param custom_attributes {object} Any custom attributes you want to associate with the sub-account, as a map/hash of key/value pairs.
 * @param enabled {boolean} Whether the sub-account is enabled. Default: true
 * @param base_account {string} The ID of another sub-account, from which to copy all of the following settings: Size limits, Timed limits, and Flags.
 * @param [options] {object} - @see <a href="https://cloudinary.com/documentation/cloudinary_sdks#configuration_parameters" target="_blank">Configuration parameters</a> in the SDK documentation.
 * @param callback
 */
function create_sub_account(name, cloud_name, custom_attributes, enabled, base_account, options = {}, callback) {
  let params = {
    cloud_name: cloud_name,
    name,
    custom_attributes: custom_attributes,
    enabled,
    base_sub_account_id: base_account,
  };

  options.content_type = "json";
  let uri = ['sub_accounts'];
  return call_account_api('POST', uri, params, callback, options);
}

/**
 * @desc Deletes the specified sub-account. Supported only for accounts with fewer than 1000 images.
 * @param sub_account_id {string} - The ID of the sub-account to delete.
 * @param [options] {object} - @see <a href="https://cloudinary.com/documentation/cloudinary_sdks#configuration_parameters" target="_blank">Configuration parameters</a> in the SDK documentation.
 * @param [callback] {function}
 */
function delete_sub_account(sub_account_id, options = {}, callback) {
  let uri = ['sub_accounts', sub_account_id];
  return call_account_api('DELETE', uri, {}, callback, options);
}

/**
 * @desc Updates the the specified details of the sub-account.
 * @param sub_account_id {string} - The ID of the sub-account to update.
 * @param [name] {string} - The display name as shown in the management console.
 * @param [cloud_name] {string} - A case-insensitive cloud name comprised of alphanumeric and underscore characters. Use with caution - generates an error if the cloud name is not unique across all Cloudinary accounts. Note: Can only be changed for accounts with fewer than 1000 images.
 * @param [custom_attributes] {object} - Any custom attributes you want to associate with the sub-account, as a map/hash of key/value pairs.
 * @param [enabled] {boolean} - Whether the sub-account is enabled.
 * @param [options] {object} - @see <a href="https://cloudinary.com/documentation/cloudinary_sdks#configuration_parameters" target="_blank">Configuration parameters</a> in the SDK documentation.
 * @param [callback] {function}
 */
function update_sub_account(sub_account_id, name, cloud_name, custom_attributes, enabled, options = {}, callback) {
  let params = {
    cloud_name: cloud_name,
    name,
    custom_attributes: custom_attributes,
    enabled,
  };

  options.content_type = "json";
  let uri = ['sub_accounts', sub_account_id];
  return call_account_api('PUT', uri, params, callback, options);
}

/**
 * @desc Returns the user with the specified ID.
 * @param user_id {string} - The ID of the user to get.
 * @param [options] {object} - @see <a href="https://cloudinary.com/documentation/cloudinary_sdks#configuration_parameters" target="_blank">Configuration parameters</a> in the SDK documentation.
 * @param [callback] {function}
 */
function user(user_id, options = {}, callback) {
  let uri = ['users', user_id];
  return call_account_api('GET', uri, {}, callback, options);
}

/**
 * @desc Returns an array of all users in the account, or if conditions are specified, returns the relevant users.
 * @param [pending] {boolean} - Whether to only return pending users. Default: false (all users)
 * @param [user_ids] {string[]} - A list of up to 100 user IDs. When provided, other parameters are ignored.
 * @param [prefix] {string} - Returns users where the name or email address begins with the specified case-insensitive string.
 * @param [sub_account_id[ {string} - Only returns users who have access to the specified account.
 * @param [options] {object} - @see <a href="https://cloudinary.com/documentation/cloudinary_sdks#configuration_parameters" target="_blank">Configuration parameters</a> in the SDK documentation.
 * @param [callback] {function}
 */
function users(pending, user_ids, prefix, sub_account_id, options = {}, callback) {
  let uri = ['users'];
  let params = {
    ids: user_ids,
  };
  return call_account_api('GET', uri, params, callback, options);
}

/**
 * @desc Creates a user in the account
 * @param name {string} - Username
 * @param email {string} - A unique email address, which serves as the login name and notification address.
 * @param role {string} - The role to assign. Possible values: master_admin, admin, billing, technical_admin, reports, media_library_admin, media_library_user
 * @param [sub_account_ids] {string[]} - The list of sub-account IDs that this user can access. Note: This parameter is ignored if the role is specified as master_admin.
 * @param [options] {object} - @see <a href="https://cloudinary.com/documentation/cloudinary_sdks#configuration_parameters" target="_blank">Configuration parameters</a> in the SDK documentation.
 * @param [callback] {function}
 */
function create_user(name, email, role, sub_account_ids, options = {}, callback) {
  let uri = ['users'];
  let params = {
    name,
    email,
    role,
    sub_account_ids: sub_account_ids,
  };
  options.content_type = 'json';
  return call_account_api('POST', uri, params, callback, options);
}

/**
 * @desc Updates the details of a specified user.
 * @param user_id {string} - The ID of the user to update.
 * @param [name] {string} - The user's name.
 * @param [email] {string} - A unique email address, which serves as the login name and notification address.
 * @param [role] {string} - The role to assign. Possible values: master_admin, admin, billing, technical_admin, reports, media_library_admin, media_library_user
 * @param [sub_account_ids] {string[]} - The list of sub-account IDs that this user can access. Note: This parameter is ignored if the role is specified as master_admin.
 * @param [options] {object} - @see <a href="https://cloudinary.com/documentation/cloudinary_sdks#configuration_parameters" target="_blank">Configuration parameters</a> in the SDK documentation.
 * @param [callback] {function}
 */
function update_user(user_id, name, email, role, sub_account_ids, options = {}, callback) {
  let uri = ['users', user_id];
  let params = {
    name,
    email,
    role,
    sub_account_ids: sub_account_ids,
  };
  options.content_type = 'json';
  return call_account_api('PUT', uri, params, callback, options);
}

/**
 * @desc Deletes a user with the specified ID
 * @param user_id {string} - The ID of the user to delete.
 * @param [options] {object} - @see <a href="https://cloudinary.com/documentation/cloudinary_sdks#configuration_parameters" target="_blank">Configuration parameters</a> in the SDK documentation.
 * @param [callback] {function}
 */
function delete_user(user_id, options = {}, callback) {
  let uri = ['users', user_id];
  return call_account_api('DELETE', uri, {}, callback, options);
}

/**
 * @desc Creates a new user group for the account.
 * @param name {string} - The name for the user group.
 * @param [options] {object} - @see <a href="https://cloudinary.com/documentation/cloudinary_sdks#configuration_parameters" target="_blank">Configuration parameters</a> in the SDK documentation.
 * @param [callback] {function}
 */
function create_user_group(name, options = {}, callback) {
  let uri = ['user_groups'];
  options.content_type = 'json';
  let params = {
    name,
  };
  return call_account_api('POST', uri, params, callback, options);
}

/**
 * @desc Updates the name of a specified user group.
 * @param group_id {string} The ID of the user group to update.
 * @param name {string} - The name for the user group.
 * @param [options] {object} - @see <a href="https://cloudinary.com/documentation/cloudinary_sdks#configuration_parameters" target="_blank">Configuration parameters</a> in the SDK documentation.
 * @param [callback] {function}
 */
function update_user_group(group_id, name, options = {}, callback) {
  let uri = ['user_groups', group_id];
  let params = {
    name,
  };
  return call_account_api('PUT', uri, params, callback, options);
}

/**
 * @desc Deletes a user group with the specified ID.
 * @param group_id {string} The ID of the user group to delete.
 * @param [options] {object} - @see <a href="https://cloudinary.com/documentation/cloudinary_sdks#configuration_parameters" target="_blank">Configuration parameters</a> in the SDK documentation.
 * @param [callback] {function}
 */
function delete_user_group(group_id, options = {}, callback) {
  let uri = ['user_groups', group_id];
  return call_account_api('DELETE', uri, {}, callback, options);
}

/**
 * @desc Adds a user to a group with the specified ID.
 * @param group_id {string} - The ID of the user group.
 * @param user_id {string} - The ID of the user.
 * @param [options] {object} - @see <a href="https://cloudinary.com/documentation/cloudinary_sdks#configuration_parameters" target="_blank">Configuration parameters</a> in the SDK documentation.
 * @param [callback] {function}
 */
function add_user_to_group(group_id, user_id, options = {}, callback) {
  let uri = ['user_groups', group_id, 'users', user_id];
  return call_account_api('POST', uri, {}, callback, options);
}

/**
 * @desc Removes a user from a group with the specified ID.
 * @param group_id {string} - The ID of the user group.
 * @param user_id {string} - The ID of the user.
 * @param [options] {object} - @see <a href="https://cloudinary.com/documentation/cloudinary_sdks#configuration_parameters" target="_blank">Configuration parameters</a> in the SDK documentation.
 * @param [callback] {function}
 */
function remove_user_from_group(group_id, user_id, options = {}, callback) {
  let uri = ['user_groups', group_id, 'users', user_id];
  return call_account_api('DELETE', uri, {}, callback, options);
}

/**
 * @desc Returns a user group with the specified ID.
 * @param group_id {string} - The ID of the user group to get.
 * @param [options] {object} - @see <a href="https://cloudinary.com/documentation/cloudinary_sdks#configuration_parameters" target="_blank">Configuration parameters</a> in the SDK documentation.
 * @param [callback] {function}
 */
function user_group(group_id, options = {}, callback) {
  let uri = ['user_groups', group_id];
  return call_account_api('GET', uri, {}, callback, options);
}

/**
 * @desc Returns an array of all user groups in the account.
 * @param [options] {object} - @see <a href="https://cloudinary.com/documentation/cloudinary_sdks#configuration_parameters" target="_blank">Configuration parameters</a> in the SDK documentation.
 * @param [callback] {function}
 */
function user_groups(options = {}, callback) {
  let uri = ['user_groups'];
  return call_account_api('GET', uri, {}, callback, options);
}

/**
 * @desc Returns the users in the specified group.
 * @param group_id {string} - The ID of the user group.
 * @param [options] {object} - @see <a href="https://cloudinary.com/documentation/cloudinary_sdks#configuration_parameters" target="_blank">Configuration parameters</a> in the SDK documentation.
 * @param [callback] {function}
 */
function user_group_users(group_id, options = {}, callback) {
  let uri = ['user_groups', group_id, 'users'];
  return call_account_api('GET', uri, {}, callback, options);
}


module.exports = {
  sub_accounts,
  create_sub_account,
  delete_sub_account,
  sub_account,
  update_sub_account,
  user,
  users,
  user_group,
  user_groups,
  user_group_users,
  remove_user_from_group,
  delete_user,
  update_user_group,
  update_user,
  create_user,
  create_user_group,
  add_user_to_group,
  delete_user_group,
};