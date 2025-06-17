import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../database/sequelize.js";

export class Product extends Model {}

/**
 * Configuración del campo id: 🚀
 *   - **type**: 'DataTypes.BIGINT' 🛠️
 *   - **BIGINT**: Utilizado para almacenar números enteros grandes. 📊
 *   - Nota: Usa el mismo tipo de dato para llaves foráneas (ej: 'id BIGINT UNSIGNED'). 🔑
 *   - **autoIncrement**: true 🔄
 *   - Incrementa automáticamente el valor cada vez que se inserta un nuevo registro. 📈
 *   - **primaryKey**: true 🏷️
 *   - Define este campo como la clave primaria de la tabla. 🗂️
 */
Product.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), // 10 digits total, 2 after the decimal point
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // Default stock value
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Default status is active
    },

    // add your columns here ✍️
  },
  {
    sequelize,
    modelName: "product",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
