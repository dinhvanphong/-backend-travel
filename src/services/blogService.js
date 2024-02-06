
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

export const blogService = {
  newCreate
}
