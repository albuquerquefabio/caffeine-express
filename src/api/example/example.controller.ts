import { Request, Response } from 'express'
import { Model } from 'mongoose'
import { IExample } from '../../types/example.type'
import exampleModel from './example.model'

interface IExampleQuery {
  page?: number
  limit?: number
  search?: string
  status?: boolean
  sort?: number
}

const paginateDoc = async ({ page = 1, limit = 1, status = true }) => {
  const docCount = await exampleModel.aggregate([
    {
      $match: {
        status
      }
    },
    {
      $group: {
        _id: null,
        count: { $sum: +1 }
      }
    },
    { $project: { _id: 0 } }
  ])

  const total = docCount.length ? docCount[0].count : 0
  const calcPages = +(total / limit).toFixed(0)
  const pages = calcPages >= 2 ? calcPages : 1
  const skip = pages >= 2 ? [{ $skip: page * limit - limit }] : []
  return { skip, pages, total }
}

export const exampleCtrl = {
  create: () => async (req: Request, res: Response) => {
    const { title, description = '' }: IExample = req.body
    try {
      const stmt = await exampleModel.create({ title, description })
      res.send(stmt)
    } catch (error) {
      res.status(500).send({ error: `${error}` })
    }
  },
  list: () => async (req: Request, res: Response) => {
    const {
      page = 1,
      limit = 1,
      search,
      status = true,
      sort = 1
    }: IExampleQuery = req.query
    const obj = search ? { $text: { $search: search }, status } : { status }
    const contentLimit = +limit >= 50 ? 50 : +limit
    const minPage = +page <= 0 ? 1 : +page
    try {
      const { skip, total, pages } = await paginateDoc({
        page: +minPage,
        limit: contentLimit,
        status
      })
      const docs = await exampleModel.aggregate([
        {
          $match: {
            ...obj
          }
        },
        {
          $sort: {
            createdAt: sort ? 1 : -1
          }
        },
        ...skip,
        { $limit: contentLimit }
      ])
      if (!docs?.length) return res.status(404).send({ msg: 'Not Found.' })

      res.send({ total, pages, page: +minPage, limit: contentLimit, docs })
    } catch (error) {
      res.status(500).send({ error: `${error}` })
    }
  },
  read: () => async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      const docs = await exampleModel.findOne({ _id: id, status: true }).exec()
      if (!docs) return res.status(404).send({ msg: 'Not Found.' })

      res.send(docs)
    } catch (error) {
      res.status(500).send({ error: `${error}` })
    }
  },

  update: () => async (req: Request, res: Response) => {
    const { id } = req.params
    const obj = Object.fromEntries(
      Object.entries(req.body).filter(
        ([key, val]) => key === 'title' || key === 'description'
      )
    )

    try {
      const stmt = await exampleModel
        .updateOne({ _id: id, status: true }, { ...obj })
        .exec()
      res.send(stmt)
    } catch (error) {
      res.status(500).send({ error: `${error}` })
    }
  },
  delete: () => async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const stmt = await exampleModel
        .updateOne({ _id: id }, { $set: { status: false } })
        .exec()
      res.send(stmt)
    } catch (error) {
      res.status(500).send({ error: `${error}` })
    }
  }
}
