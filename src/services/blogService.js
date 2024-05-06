
import { slugify } from '~/utils/formatters'
import { blogModel } from '~/models/blogModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'


const newCreate =async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    const createdBlog= await blogModel.createNew(newBoard)
    const getNewBlog = await blogModel.findOneById(createdBlog.insertedId)
    return getNewBlog
  } catch (error) { throw error }

}

const getListBlog =async () => {
  try {
    const listBlog= await blogModel.getListBlog( )
    return listBlog
  } catch (error) { throw error }

}

const getFindBlog =async (params) => {
  try {
    const listBlog= await blogModel.getFindBlog(params)
    return listBlog
  } catch (error) { throw error }

}

const getListBlogPagination =async (page, limit) => {
  try {
    const listBlog= await blogModel.getListBlogPagination(page, limit)
    return listBlog
  } catch (error) { throw error }
}

const getDetail =async (slug) => {
  try {
    const blogDetail= await blogModel.getDetail(slug)
    return blogDetail
  } catch (error) { throw error }

}

const getMienBacBlogs =async () => {
  try {
    const mienBacBlogs= await blogModel.getMienBacBlogs()
    return mienBacBlogs
  } catch (error) { throw error }

}

const getMienTrungBlogs =async () => {
  try {
    const mienTrungBlogs= await blogModel.getMienTrungBlogs()
    return mienTrungBlogs
  } catch (error) { throw error }

}

const getMienNamBlogs =async () => {
  try {
    const mienNamBlogs= await blogModel.getMienNamBlogs()
    return mienNamBlogs
  } catch (error) { throw error }
}

const update =async (id, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      slug: slugify(reqBody.title),
      updateAt: Date.now()
    }
    const blogUpdated= await blogModel.update(id, updateData)
    return blogUpdated
  } catch (error) { throw error }
}

const hiddenBlog =async (id, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      _destroy: true,
      updateAt: Date.now()
    }
    const hiddenBlog= await blogModel.hiddenBlog(id, updateData)
    return hiddenBlog
  } catch (error) { throw error }
}

const restoreBlog =async (id, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      _destroy: false,
      updateAt: Date.now()
    }
    const restoreBlog= await blogModel.restoreBlog(id, updateData)
    return restoreBlog
  } catch (error) { throw error }
}

const deletedListBlog =async () => {
  try {
    const deletedListBlog= await blogModel.deletedListBlog()
    return deletedListBlog
  } catch (error) { throw error }

}

const deleteBlog =async (id) => {
  try {
    const targetColumn = await blogModel.deleteBlog(id)
    if (!targetColumn) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Column not found!')
    }
  } catch (error) { throw error }
}

export const blogService = {
  newCreate,
  getListBlog,
  getFindBlog,
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
