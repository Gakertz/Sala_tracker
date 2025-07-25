module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Schedule', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sala: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    docente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hora_inicio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hora_fin: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};