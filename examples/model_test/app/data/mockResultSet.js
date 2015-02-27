var MockResultSet = {};

MockResultSet.t1 = [{
	blog_id: 1,
	blog_title: 'test_title',
	blog_content: 'test_content',
	author_name: 'test_author'
}];

MockResultSet.t2 = [{
	blog_id: 1,
	blog_title: 'test_title',
	blog_content: 'test_content',
	author_name: 'test_author',
	comment_id: 1,
	comment_content: 'test_comment'
}, {
	blog_id: 1,
	blog_title: 'test_title',
	blog_content: 'test_content',
	author_name: 'test_author',
	comment_id: 2,
	comment_content: 'test_comment_2'
}];

MockResultSet.t3 = [{
	blog_id: 1,
	blog_title: 'test_title',
	blog_content: 'test_content',
	author_name: 'test_author',
	comment_id: 1,
	comment_content: 'test_comment',
	comment_author_id: 2,
	comment_author_name: 'test_comment_author'
}, {
	blog_id: 1,
	blog_title: 'test_title',
	blog_content: 'test_content',
	author_name: 'test_author',
	comment_id: 2,
	comment_content: 'test_comment_2',
	comment_author_id: 3,
	comment_author_name: 'test_comment_author_3'
}]

var r = [{
	"$mid": "commentResult",
	"author": {
		"$mid": "author",
		"$table": "ba_author",
		"$prefix": "author_",
		"id": 2,
		"name": "test_comment_author",
		"create_at": "$type:Number",
		"update_at": "$type:Number"
	},
	"comment": {
		"$mid": "comment",
		"$table": "ba_comment",
		"$prefix": "comment_",
		"id": 1,
		"aid": "$type:Number",
		"bid": "$type:Number",
		"content": "test_comment",
		"create_at": "$type:Number",
		"update_at": "$type:Number"
	}
}, {
	"$mid": "commentResult",
	"author": {
		"$mid": "author",
		"$table": "ba_author",
		"$prefix": "author_",
		"id": 3,
		"name": "test_comment_author_3",
		"create_at": "$type:Number",
		"update_at": "$type:Number"
	},
	"comment": {
		"$mid": "comment",
		"$table": "ba_comment",
		"$prefix": "comment_",
		"id": 2,
		"aid": "$type:Number",
		"bid": "$type:Number",
		"content": "test_comment_2",
		"create_at": "$type:Number",
		"update_at": "$type:Number"
	}
}];

module.exports = MockResultSet;