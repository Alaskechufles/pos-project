import { Product } from "../Product/Model.js";
import { Shopping } from "./Model.js";
import { Products_Shopping } from "../Products_Shopping/Model.js";

/**
 * @description Get all Shoppings
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const index = async (req, res, next) => {
  try {
    //#swagger.tags = ['Shopping']
    //#swagger.description = 'Obtiene todos los shopping activos.'

    const shopping = await Shopping.findAll({
      include: [{ association: "shopping_details", include: ["products"] }],
    });
    res.status(200).json(shopping);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Get a single Shopping
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const show = async (req, res, next) => {
  try {
    //#swagger.tags = ['Shopping']
    //#swagger.description = 'Obtiene un shopping por id.'

    const shopping = await Shopping.findByPk(req.params.id);
    if (!shopping) {
      throw { status: 404, message: "shopping not found" };
    }
    res.status(200).json(shopping);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Create a new Shopping
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const store = async (req, res, next) => {
  try {
    //#swagger.tags = ['Shopping']
    //#swagger.description = 'Crea un nuevo shopping.'

    const { total, products } = req.body;
    const shopping = await Shopping.create({ total });
    const transaction = async (pr) => {
      const product = await Product.findByPk(pr.product_id);
      await Products_Shopping.create({
        product_id: pr.product_id,
        shopping_id: shopping.id,
        amount: pr.amount,
        price: product.price,
        total: product.price * pr.amount,
      });
      product.stock += pr.amount;
      product.save();
    };
    products.forEach(transaction);

    res.status(201).json({
      status: "ok",
      message: "Shopping created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Update a Shopping
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const update = async (req, res, next) => {
  try {
    //#swagger.tags = ['Shopping']
    //#swagger.description = 'Actualiza un shopping por id.'

    const shopping = await ShoppingfindByPk(req.params.id);
    if (!shopping) {
      throw { status: 404, message: "Shopping not found" };
    }
    await shopping.update(req.body);
    await shopping.save();
    res.status(200).json({
      status: "ok",
      message: "Shopping updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Delete a Shopping
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */

export const destroy = async (req, res, next) => {
  try {
    //#swagger.tags = ['Shopping']
    //#swagger.description = 'Elimina un shopping por id.'

    const shopping = await Shopping.findByPk(req.params.id);
    if (!shopping) {
      throw { status: 404, message: "Shopping not found" };
    }
    await shopping.destroy();
    res.status(204).json({
      status: "ok",
      message: "Shopping deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default { index, show, store, update, destroy };
