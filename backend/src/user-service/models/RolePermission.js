'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class RolePermission extends Model {
    static associate(models) {
      // Asociaciones si es necesario
    }
  }

  RolePermission.init({
    roleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Roles',
        key: 'id',
      },
    },
    permissionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Permissions',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'RolePermission',
    tableName: 'RolePermissions',
    timestamps: false,
  });

  return RolePermission;
};