import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
// import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'


const BLOG_COLLECTION_NAME = 'blogs'
const BLOG_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).trim().strict(),
  time: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).trim().strict(),
  note:Joi.string().required().min(3).trim().strict(),
  imgList: Joi.array().items(
    Joi.string()
  ),
  slug: Joi.string().required().min(3).trim().strict(),
  // type: Joi.string().valid('public', 'private').required(),
  // description: Joi.string().required().min(3).max(50).trim().strict(),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)

})

const INVALID_UPDATE_FIELDS = ['_id', 'createdAt']

const validateBeforeCreate = async (data) => {
  return await BLOG_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const createdBoard = await GET_DB().collection(BLOG_COLLECTION_NAME).insertOne(validData)
    return createdBoard
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    const result = await GET_DB().collection(BLOG_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getListBlog = async () => {
  try {
    const listBlog = await GET_DB().collection(BLOG_COLLECTION_NAME).aggregate([
      { $match: {
        _destroy: false
      } }
    ]).toArray()
    return listBlog
  } catch (error) {
    throw new Error(error)
  }
}

const getDetail = async (id) => {
  try {
    const blogDetail = await GET_DB().collection(BLOG_COLLECTION_NAME).aggregate([
      { $match: {
        _id: new ObjectId(id),
        _destroy: false
      } }
    ]).toArray()
    return blogDetail[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, updateData) => {
  try {
    Object.keys(updateData).forEach(key => {
      if (INVALID_UPDATE_FIELDS.includes(key)) {
        delete updateData[key]
      }
    })

    const result = await GET_DB().collection(BLOG_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: 'after' }
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const blogModel = {
  BLOG_COLLECTION_NAME,
  BLOG_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getListBlog,
  getDetail,
  update
}
