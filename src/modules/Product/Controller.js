import { Product } from "./Model.js";

/**
 * @description Get all Products
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const index = async (req, res, next) => {
  try {
    //#swagger.tags = ['Product']
    //#swagger.description = 'Obtiene todos los product activos.'

    const product = await Product.findAll();
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Get a single Product
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const show = async (req, res, next) => {
  try {
    //#swagger.tags = ['Product']
    //#swagger.description = 'Obtiene un product por id.'

    const product = await Product.findByPk(req.params.id);
    if (!product) {
      throw { status: 404, message: "product not found" };
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Create a new Product
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const store = async (req, res, next) => {
  try {
    //#swagger.tags = ['Product']
    //#swagger.description = 'Crea un nuevo product.'
    const { name, description, price, stock } = req.body;
    const product = await Product.create(req.body, {
      validate: true,
    });
    res.status(201).json({
      status: "ok",
      message: "Product created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Update a Product
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const update = async (req, res, next) => {
  try {
    //#swagger.tags = ['Product']
    //#swagger.description = 'Actualiza un product por id.'
    const { name, description, price, stock } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      throw { status: 404, message: "Product not found" };
    }
    await product.update(req.body);
    await product.save();
    res.status(200).json({
      status: "ok",
      message: "Product updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Delete a Product
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */

export const destroy = async (req, res, next) => {
  try {
    //#swagger.tags = ['Product']
    //#swagger.description = 'Elimina un product por id.'

    const product = await Product.findByPk(req.params.id);
    if (!product) {
      throw { status: 404, message: "Product not found" };
    }
    await product.destroy();
    res.status(204).json({
      status: "ok",
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default { index, show, store, update, destroy };
