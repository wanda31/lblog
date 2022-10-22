var sqlMap = {
    login: 'select uname,uid from blog_user where uname= ? and binary upwd= ?',
    personnal: 'select * from private where uid= ? and binary token like ?',
    article_update:'insert  into blog_articles (uid,article_title,article_content,article_date,article_html,article_tag,article_type,article_brief) values (?,?,?,?,?,?,?,?)',
    article_detail: 'select * from blog_articles where article_id= ? ',
    articleList:'select count(*) as sum from blog_articles; select article_id,uid,article_title,DATE_FORMAT(article_date,"%Y-%m-%d") AS article_date,article_tag,article_type,article_brief from blog_articles order by article_id desc;',
    updateArticle:'update blog_articles set article_content = ? , article_html = ? where article_id = ?'
  }

  module.exports = sqlMap;
