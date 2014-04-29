/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat Constant
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

module.exports = {
	SCOPE_DEFAULT: "singleton",
	SCOPE_SINGLETON: "singleton",
	SCOPE_PROTOTYPE: "prototype",

	DEPENDS_ARGS: "args",
	DEPENDS_PROPS: "props",

	SETTINGS_ARGS_ON: "argsOn",
	SETTINGS_PROPS_ON: "propsOn",
	SETTINGS_FACTORY_ARGS_ON: "factoryArgsOn",

	DEPEND_TYPE_BEAN: "d_bean",
	DEPEND_TYPE_VALUE: "d_value",
	DEPEND_TYPE_VAR: "d_var",
	DEPEND_TYPE_ERROR: "d_error",

	PROPS_DEFAULT: [],
	ARGS_DEFAULT: [],

	ASYNC_INIT_DEFAULT: false,
	LAZY_INIT_DEFAULT: false,

	INIT_CB_DEFAULT: function() {},

	AOP_ADVICE_BEFORE: "before",
	AOP_ADVICE_AFTER: "after",
	AOP_ADVICE_AROUND: "around",

	PROXY_DEFAULT: true,

	DEFAULT_ENV: "dev",

	LOGPATH: "log4js.json"
}