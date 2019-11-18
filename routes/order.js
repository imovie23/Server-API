const router = require('express').Router();const Order = require('db-schemas/lib/models/order')router.route('/')    .get(async function (req, res) {        try {            const orders = await Order.find({})                .populate('staff')                .populate('orderItems.ingredients')                .exec();            await res.json(orders);        } catch (err) {            return res.status(500).send(err);        }    })    .post(async function (req, res) {        try {            const newOrder = {                staff: req.body.staff,                table: req.body.table,                orderItems: req.body.orderItems,                orderPrice: req.body.orderPrice,                created_at: new Date(),                updated_at: new Date()            };            const order = new Order(newOrder);            await order.save();            await res.json(order);        } catch (err) {            return res.status(500).send(err);        }    });router.route('/:orderId')    .get(async function (req, res) {        try {            const order = await Order.find({_id: req.params.orderId})                .populate('staff')                .populate('orderItems.ingredients')                .exec();            await res.json(order);        } catch (err) {            return res.status(500).send(err);        }    })    .put(async function (req, res) {        try {            const newOrder = {                staff: req.body.staff,                table: req.body.table,                orderItems: req.body.orderItems,                orderPrice: req.body.orderPrice,                updated_at: new Date()            };            const addedOrder = await Order.findOneAndUpdate({                _id: req.params.orderId            }, newOrder, {new: true});            await res.json(addedOrder);        } catch (err) {            return res.status(500).send(err);        }    })    .delete(async function (req, res) {        try {            const delOrder = await Order.findByIdAndRemove(req.params.orderId);            await res.json(delOrder);        } catch (err) {            return res.status(500).send(err);        }    });module.exports = router;