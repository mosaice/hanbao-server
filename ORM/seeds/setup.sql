BEGIN;
/* roles */
INSERT INTO `role` (`id`, `createAt`, `updateAt`, `name`, `childId`, `grantId`) VALUES ('1', '2018-02-17 16:00:00', '2018-02-17 16:00:00', 'regular', NULL, NULL);
INSERT INTO `role` (`id`, `createAt`, `updateAt`, `name`, `childId`, `grantId`) VALUES ('2', '2018-02-17 16:00:00', '2018-02-17 16:00:00', 'admin', '1', '1');
INSERT INTO `role` (`id`, `createAt`, `updateAt`, `name`, `childId`, `grantId`) VALUES ('3', '2018-02-17 16:00:00', '2018-02-17 16:00:00', 'owner', '2', '2');
INSERT INTO `role` (`id`, `createAt`, `updateAt`, `name`, `childId`, `grantId`) VALUES ('4', '2018-02-17 16:00:00', '2018-02-17 16:00:00', 'privateOwner', '2', '1');

/* resources */
INSERT INTO `resource` (`id`, `createAt`, `updateAt`, `type`, `module`, `name`) VALUES ('1', '2017-01-17 22:39:45', '2017-01-17 22:39:45', 'access', 'group', 'post');
INSERT INTO `resource` (`id`, `createAt`, `updateAt`, `type`, `module`, `name`) VALUES ('2', '2017-01-17 22:39:45', '2017-01-17 22:39:45', 'access', 'group', 'comment');
INSERT INTO `resource` (`id`, `createAt`, `updateAt`, `type`, `module`, `name`) VALUES ('3', '2017-01-17 22:39:45', '2017-01-17 22:39:45', 'access', 'group', 'profile');
INSERT INTO `resource` (`id`, `createAt`, `updateAt`, `type`, `module`, `name`) VALUES ('4', '2017-01-17 22:39:45', '2017-01-17 22:39:45', 'access', 'group', 'member');

INSERT INTO `resource` (`id`, `createAt`, `updateAt`, `type`, `module`, `name`) VALUES ('5', '2017-01-17 22:39:45', '2017-01-17 22:39:45', 'delete', 'group', 'post');
INSERT INTO `resource` (`id`, `createAt`, `updateAt`, `type`, `module`, `name`) VALUES ('6', '2017-01-17 22:39:45', '2017-01-17 22:39:45', 'delete', 'group', 'comment');
INSERT INTO `resource` (`id`, `createAt`, `updateAt`, `type`, `module`, `name`) VALUES ('7', '2017-01-17 22:39:45', '2017-01-17 22:39:45', 'delete', 'group', 'member');
INSERT INTO `resource` (`id`, `createAt`, `updateAt`, `type`, `module`, `name`) VALUES ('8', '2017-01-17 22:39:45', '2017-01-17 22:39:45', 'create', 'group', 'member');
INSERT INTO `resource` (`id`, `createAt`, `updateAt`, `type`, `module`, `name`) VALUES ('9', '2017-01-17 22:39:45', '2017-01-17 22:39:45', 'update', 'group', 'profile');

INSERT INTO `resource` (`id`, `createAt`, `updateAt`, `type`, `module`, `name`) VALUES ('10', '2017-01-17 22:39:45', '2017-01-17 22:39:45', 'delete', 'group', 'group');
INSERT INTO `resource` (`id`, `createAt`, `updateAt`, `type`, `module`, `name`) VALUES ('11', '2017-01-17 22:39:45', '2017-01-17 22:39:45', 'update', 'group', 'member');
INSERT INTO `resource` (`id`, `createAt`, `updateAt`, `type`, `module`, `name`) VALUES ('12', '2017-01-17 22:39:45', '2017-01-17 22:39:45', 'update', 'group', 'viewPermission');

INSERT INTO `resource` (`id`, `createAt`, `updateAt`, `type`, `module`, `name`) VALUES ('13', '2017-01-17 22:39:45', '2017-01-17 22:39:45', 'view', 'group', 'post');
INSERT INTO `resource` (`id`, `createAt`, `updateAt`, `type`, `module`, `name`) VALUES ('14', '2017-01-17 22:39:45', '2017-01-17 22:39:45', 'view', 'group', 'comment');
INSERT INTO `resource` (`id`, `createAt`, `updateAt`, `type`, `module`, `name`) VALUES ('15', '2017-01-17 22:39:45', '2017-01-17 22:39:45', 'view', 'group', 'member');

/* role with resource */

INSERT INTO `resource_roles_role` (`resourceId`, `roleId`) VALUES ('1', '1');
INSERT INTO `resource_roles_role` (`resourceId`, `roleId`) VALUES ('2', '1');
INSERT INTO `resource_roles_role` (`resourceId`, `roleId`) VALUES ('3', '1');
INSERT INTO `resource_roles_role` (`resourceId`, `roleId`) VALUES ('4', '1');
INSERT INTO `resource_roles_role` (`resourceId`, `roleId`) VALUES ('13', '1');
INSERT INTO `resource_roles_role` (`resourceId`, `roleId`) VALUES ('14', '1');
INSERT INTO `resource_roles_role` (`resourceId`, `roleId`) VALUES ('15', '1');

INSERT INTO `resource_roles_role` (`resourceId`, `roleId`) VALUES ('5', '2');
INSERT INTO `resource_roles_role` (`resourceId`, `roleId`) VALUES ('6', '2');
INSERT INTO `resource_roles_role` (`resourceId`, `roleId`) VALUES ('7', '2');
INSERT INTO `resource_roles_role` (`resourceId`, `roleId`) VALUES ('8', '2');
INSERT INTO `resource_roles_role` (`resourceId`, `roleId`) VALUES ('9', '2');

INSERT INTO `resource_roles_role` (`resourceId`, `roleId`) VALUES ('10', '3');
INSERT INTO `resource_roles_role` (`resourceId`, `roleId`) VALUES ('11', '3');
INSERT INTO `resource_roles_role` (`resourceId`, `roleId`) VALUES ('12', '3');


COMMIT;
