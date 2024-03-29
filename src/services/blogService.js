
import { slugify } from '~/utils/formatters'
import { blogModel } from '~/models/blogModel'


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
    const listBlog= await blogModel.getListBlog()
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

const deletedListBlog =async () => {
  try {
    const deletedListBlog= await blogModel.deletedListBlog()
    return deletedListBlog
  } catch (error) { throw error }

}

export const blogService = {
  newCreate,
  getListBlog,
  getDetail,
  update,
  deletedListBlog,
  getMienBacBlogs
}
