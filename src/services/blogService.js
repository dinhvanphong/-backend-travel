
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

const getDetail =async (id) => {
  try {
    const blogDetail= await blogModel.getDetail(id)
    return blogDetail
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

export const blogService = {
  newCreate,
  getListBlog,
  getDetail,
  update
}
