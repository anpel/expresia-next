export async function getSortedPostsData() {
    const allPostsData = await fetch(
        "https://motionlessalarmeddevil.xpr.cloud/elementAjax/ApiTests/ArticleListing", {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then((response) => response.json());

    return allPostsData;
}

export async function getAllPostIds() {
    const fileNames = await fetch(
        "https://motionlessalarmeddevil.xpr.cloud/elementAjax/ApiTests/ArticleIds", {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then((response) => response.json());

    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName
            }
        }
    })
}

export async function getPostData(id) {
    const allPostsData = await getSortedPostsData();

    const currentPost = allPostsData.filter(function (post) {
        return post.id == id;
    });

    // const fullPath = path.join(postsDirectory, `${id}.md`)
    // const fileContents = fs.readFileSync(fullPath, 'utf8')

    // // Use gray-matter to parse the post metadata section
    // const matterResult = matter(fileContents)

    // // Use remark to convert markdown into HTML string
    // const processedContent = await remark()
    //   .use(html)
    //   .process(matterResult.content)
    // const contentHtml = processedContent.toString()

    // Combine the data with the id and contentHtml
    return currentPost
}