import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { commentModel } from '~/models/commentModel'
// import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const BLOG_COLLECTION_NAME = 'blogs'
const BLOG_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).trim().strict(),
  time: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).trim().strict(),
  note:Joi.string().required().min(3).trim().strict(),
  zones: Joi.string().valid('mien-bac', 'mien-trung', 'mien-nam').required(),
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
    const createdBoard = await GET_DB().collection(BLOG_COLLECTION_NAME).insertOne(validData, { ordered: true })
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

const getListBlogPagination = async (page, pageSize) => {
  try {
    page = parseInt(page)
    pageSize = parseInt(pageSize)
    const skip = (page -1) * pageSize
    const listBlogPage = await GET_DB().collection(BLOG_COLLECTION_NAME).aggregate([
      { $match: {
        _destroy: false
      } }
    ]).skip(skip).limit(pageSize).toArray()
    const listBlog = await GET_DB().collection(BLOG_COLLECTION_NAME).aggregate([
      { $match: {
        _destroy: false
      } }
    ]).toArray()
    return { listBlogPage, totalBlog:listBlog.length }
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

const getDetail = async (slug) => {
  try {
    const blogDetail = await GET_DB().collection(BLOG_COLLECTION_NAME).aggregate([
      { $match: {
        slug: slug,
        _destroy: false
      } },
      { $lookup: {
        from: commentModel.COMMENT_COLLECTION_NAME,
        localField: '_id',
        foreignField: 'blogId',
        as: 'comments'
      } }
    ]).toArray()
    return blogDetail[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

const getMienBacBlogs = async () => {
  try {
    const mienBacBlog = await GET_DB().collection(BLOG_COLLECTION_NAME).aggregate([
      { $match: {
        zones: 'mien-bac',
        _destroy: false
      } }
    ]).toArray()
    return mienBacBlog
  } catch (error) {
    throw new Error(error)
  }
}

const getMienTrungBlogs = async () => {
  try {
    const mienBacBlog = await GET_DB().collection(BLOG_COLLECTION_NAME).aggregate([
      { $match: {
        zones: 'mien-trung',
        _destroy: false
      } }
    ]).toArray()
    return mienBacBlog
  } catch (error) {
    throw new Error(error)
  }
}

const getMienNamBlogs = async () => {
  try {
    const mienNamBlog = await GET_DB().collection(BLOG_COLLECTION_NAME).aggregate([
      { $match: {
        zones: 'mien-nam',
        _destroy: false
      } }
    ]).toArray()
    return mienNamBlog
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

const hiddenBlog = async (id, updateData) => {
  try {
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

const restoreBlog = async (id, updateData) => {
  try {
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


const deletedListBlog = async () => {
  try {
    const listBlog = await GET_DB().collection(BLOG_COLLECTION_NAME).aggregate([
      { $match: {
        _destroy: true
      } }
    ]).toArray()
    return listBlog
  } catch (error) {
    throw new Error(error)
  }
}

const deleteBlog = async (id) => {
  try {
    const result = await GET_DB().collection(BLOG_COLLECTION_NAME).deleteOne({
      _id: new ObjectId(id)
    })
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
  getListBlogPagination,
  getDetail,
  update,
  hiddenBlog,
  restoreBlog,
  deletedListBlog,
  getMienBacBlogs,
  getMienNamBlogs,
  getMienTrungBlogs,
  deleteBlog
}
