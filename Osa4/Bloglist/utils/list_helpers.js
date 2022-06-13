

const totalLikes = (blogs) => {
  
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  var max = Math.max(...blogs.map(o => o.likes))
  var index = blogs.map(o => o.likes).indexOf(max)
  return blogs[index].title

}
module.exports = {
  totalLikes,
  favoriteBlog
}

