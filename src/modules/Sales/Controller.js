import { Product } from "../Product/Model.js";
import { Products_Sales } from "../Products_Sales/Model.js";
import { Sales } from "./Model.js";

/**
 * @description Get all Saless
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const index = async (req, res, next) => {
  try {
    //#swagger.tags = ['Sales']
    //#swagger.description = 'Obtiene todos los sales activos.'

    const sales = await Sales.findAll();
    res.status(200).json(sales);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Get a single Sales
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const show = async (req, res, next) => {
  try {
    //#swagger.tags = ['Sales']
    //#swagger.description = 'Obtiene un sale por id.'

    const sale = await Sales.findByPk(req.params.id);
    if (!sale) {
      throw { status: 404, message: "sale not found" };
    }
    res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Create a new Sales
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const store = async (req, res, next) => {
  try {
    //#swagger.tags = ['Sales']
    //#swagger.description = 'Crea un nuevo sale.'
    const { total, products } = req.body;
    const sale = await Sales.create({ total });

    const transaction = async (pr) => {
      const product = await Product.findByPk(pr.product_id);

      await Products_Sales.create({
        sale_id: sale.id,
        product_id: pr.product_id,
        price: product.price,
        amount: pr.amount,
        total: product.price * pr.amount,
      });
      product.stock -= pr.amount;
      product.save()
    };

    products.forEach(transaction);

    res.status(201).json({
      status: "ok",
      message: "Sale registered successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Update a Sales
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const update = async (req, res, next) => {
  try {
    //#swagger.tags = ['Sales']
    //#swagger.description = 'Actualiza un sale por id.'

    const sale = await SalesfindByPk(req.params.id);
    if (!sale) {
      throw { status: 404, message: "Sales not found" };
    }
    await sale.update(req.body);
    await sale.save();
    res.status(200).json({
      status: "ok",
      message: "Sales updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Delete a Sales
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */

export const destroy = async (req, res, next) => {
  try {
    //#swagger.tags = ['Sales']
    //#swagger.description = 'Elimina un sale por id.'

    const sale = await Sales.findByPk(req.params.id);
    if (!sale) {
      throw { status: 404, message: "Sales not found" };
    }
    await sale.destroy();
    res.status(204).json({
      status: "ok",
      message: "Sales deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default { index, show, store, update, destroy };
 
