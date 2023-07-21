import IPost from "../post/post"

export default interface IComment {
  comment:string
  comment_id:number
  creation_date:string
  is_confirmed:boolean
  post_id:number
  user_id:number
  username?:string
  post?:IPost
}
