(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['account'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"click":"submitContentForm","icon":"done"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"click":"goBack","icon":"close"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "		<form action=\"updateAccount/"
    + alias4(((helper = (helper = helpers.user || (depth0 != null ? depth0.user : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"user","hash":{},"data":data}) : helper)))
    + "\" method=\"post\">\n			<div class=\"element\">\n				<div class=\"field label\">Nom</div>\n				<div class=\"field value\" element=\"\">\n					<input type=\"text\" name=\"name\" placeholder="
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + ">\n				</div>\n			</div>\n		</form>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.index,depth0,{"name":"index","hash":{"filters":"off","displaymode":"table","icon":"account-circle","title":(depth0 != null ? depth0.name : depth0)},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"1_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"args":["actions"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"args":["menu"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"args":["content"],"data":data}) || fn;
  return fn;
  }

,"useDecorators":true,"usePartial":true,"useData":true,"useDepths":true});
templates['actions-objectcontent'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "";
},"2":function(container,depth0,helpers,partials,data) {
    return "			<input type=\"text\" placeholder=\"Rechercher...\">\n";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.properties : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "				<a class=\"dropdown-item\" href=\"#\">\n					<input name=\"sort\" type=\"radio\" value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "/>\n					<span>"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</span>\n				</a>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "checked";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<form action=\"addObjectWithModel/"
    + alias4(((helper = (helper = helpers.parent || (depth0 != null ? depth0.parent : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"parent","hash":{},"data":data}) : helper)))
    + "\" method=\"post\">\n	<input type=\"hidden\" name=\"model\" value=\""
    + alias4(((helper = (helper = helpers.model || (depth0 != null ? depth0.model : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"model","hash":{},"data":data}) : helper)))
    + "\">\n	"
    + alias4((helpers.setAddAction || (depth0 && depth0.setAddAction) || alias2).call(alias1,(depth0 != null ? depth0.models : depth0),{"name":"setAddAction","hash":{},"data":data}))
    + "\n</form>\n<form method=\"post\" action=\"getUserObjects\">\n"
    + ((stack1 = container.invokePartial(partials.dropdown,depth0,{"name":"dropdown","hash":{"class":"dropdown-menu-content","icon":"search"},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.dropdown,depth0,{"name":"dropdown","hash":{"icon":"sort"},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</form>";
},"1_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"args":["content"],"data":data}) || fn;
  return fn;
  }

,"useDecorators":true,"4_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"args":["content"],"data":data}) || fn;
  return fn;
  }

,"usePartial":true,"useData":true,"useDepths":true});
templates['files'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"click":"submitContentForm","icon":"done"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"click":"goBack","icon":"close"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "		<div class=\"element\">\n			<span class=\"field label\">Droit</span>\n			<span class=\"field\">"
    + ((stack1 = container.invokePartial(partials.select,depth0,{"name":"select","hash":{"options":(depth0 != null ? depth0.rights : depth0),"name":"right"},"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</span>\n		</div>\n		<div class=\"element\">\n			<span class=\"field label\">Champs visibles</span>\n			<span class=\"field\">\n				<a href=\"\" click=\"popTemplate\" template=\"objectrole-selection\">Titre, Date...</a>\n			</span>\n		</div>\n		<div class=\"element\">\n			<span class=\"field label\">Filtres</span>\n			<span class=\"field\">\n				<span click=\"popTemplate\" template=\"objectrole-filters\" class=\"badge badge-primary badge-pill\">1</span>\n			</span>\n		</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.index,depth0,{"name":"index","hash":{"displaymode":"table","icon":"album","title":"Medias"},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"1_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"args":["actions"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"args":["menu"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"args":["content"],"data":data}) || fn;
  return fn;
  }

,"useDecorators":true,"usePartial":true,"useData":true,"useDepths":true});
templates['filtering-objectcontent'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"topbar filtering\">\n	<p></p>\n</div>\n"
    + ((stack1 = container.invokePartial(partials.objectcontent,depth0,{"name":"objectcontent","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
templates['index'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.dropdown,depth0,{"name":"dropdown","hash":{"icon":"menu"},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials["menu-full"],depth0,{"name":"menu-full","data":data,"indent":"\t\t\t\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "					<h1>"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"title","hash":{},"data":data}) : helper)))
    + "</h1>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"main\" class=\"view\" displaymode=\""
    + alias4(((helper = (helper = helpers.displaymode || (depth0 != null ? depth0.displaymode : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"displaymode","hash":{},"data":data}) : helper)))
    + "\" filters=\""
    + alias4(((helper = (helper = helpers.filters || (depth0 != null ? depth0.filters : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"filters","hash":{},"data":data}) : helper)))
    + "\" view=\""
    + alias4(((helper = (helper = helpers.view || (depth0 != null ? depth0.view : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"view","hash":{},"data":data}) : helper)))
    + "\" template=\""
    + alias4(((helper = (helper = helpers.template || (depth0 != null ? depth0.template : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"template","hash":{},"data":data}) : helper)))
    + "\">\n	<div class=\"head\">\n		<div class=\"menu\">\n"
    + ((stack1 = container.invokePartial(partials.menu,depth0,{"name":"menu","fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "		</div>\n		<div class=\"subject\">\n			<span class=\"icon\">\n				"
    + alias4((helpers.svg || (depth0 && depth0.svg) || alias2).call(alias1,(depth0 != null ? depth0.icon : depth0),{"name":"svg","hash":{},"data":data}))
    + "\n			</span>\n			<div class=\"title\">\n"
    + ((stack1 = container.invokePartial(partials.head,depth0,{"name":"head","fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "			</div>\n		</div>\n		<div class=\"actions\">\n		    "
    + ((stack1 = container.invokePartial(partials.actions,depth0,{"name":"actions","fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\n		    "
    + ((stack1 = container.invokePartial(partials.otheractions,depth0,{"name":"otheractions","fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\n		</div>\n		"
    + ((stack1 = container.invokePartial(partials.controls,depth0,{"name":"controls","fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\n	</div>\n	<div class=\"content\" name=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" model=\""
    + alias4(((helper = (helper = helpers.model || (depth0 != null ? depth0.model : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"model","hash":{},"data":data}) : helper)))
    + "\">\n		"
    + ((stack1 = container.invokePartial(partials.content,depth0,{"name":"content","fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\n	</div>\n</div>";
},"2_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"args":["content"],"data":data}) || fn;
  return fn;
  }

,"useDecorators":true,"usePartial":true,"useData":true,"useDepths":true});
templates['list-choose'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"icon":"close"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.position,depth0,{"name":"position","hash":{"child":(depth0 != null ? depth0.subject : depth0),"parent":(depth0 != null ? depth0.context : depth0)},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "		<form action="
    + container.escapeExpression(((helper = (helper = helpers.formaction || (depth0 != null ? depth0.formaction : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"formaction","hash":{},"data":data}) : helper)))
    + " method=\"post\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</form>\n";
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {});

  return "				<div class=\"element\">\n					<span class=\"field square\">\n						<input type=\"radio\" name=\""
    + alias1(container.lambda((depths[1] != null ? depths[1].name : depths[1]), depth0))
    + "\" "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n					</span>\n					<span class=\"field\">"
    + alias1(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias2,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n				</div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "checked";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.index,depth0,{"name":"index","hash":{"displaymode":"table","icon":(depth0 != null ? depth0.icon : depth0)},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"1_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"args":["menu"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"args":["head"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"args":["content"],"data":data}) || fn;
  return fn;
  }

,"useDecorators":true,"usePartial":true,"useData":true,"useDepths":true});
templates['list-multi'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"icon":"close"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.position,depth0,{"name":"position","hash":{"child":(depth0 != null ? depth0.subject : depth0),"parent":(depth0 != null ? depth0.context : depth0)},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "		<form action="
    + container.escapeExpression(((helper = (helper = helpers.formaction || (depth0 != null ? depth0.formaction : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"formaction","hash":{},"data":data}) : helper)))
    + " method=\"post\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</form>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "				<div class=\"element\">\n					<span class=\"field square\">\n						<input type=\"checkbox\" name=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n					</span>\n					<span class=\"field\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n				</div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "checked";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.index,depth0,{"name":"index","hash":{"displaymode":"table","icon":(depth0 != null ? depth0.icon : depth0)},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"1_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"args":["menu"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"args":["head"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"args":["content"],"data":data}) || fn;
  return fn;
  }

,"useDecorators":true,"usePartial":true,"useData":true,"useDepths":true});
templates['list-navigation'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"icon":"close"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "		<form action=\""
    + container.escapeExpression(((helper = (helper = helpers.action || (depth0 != null ? depth0.action : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"action","hash":{},"data":data}) : helper)))
    + "\" method=\"post\">\n"
    + ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"icon":"add-circle-blue"},"data":data,"indent":"\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "		</form>\n";
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=helpers.helperMissing, alias4="function";

  return "			<a href=\""
    + alias1(container.lambda((depths[1] != null ? depths[1].subject : depths[1]), depth0))
    + "/"
    + alias1(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n				<div class=\"element\">\n					<span class=\"field square\">"
    + alias1((helpers.svg || (depth0 && depth0.svg) || alias3).call(alias2,(depth0 != null ? depth0.icon : depth0),{"name":"svg","hash":{},"data":data}))
    + "</span>\n					<span class=\"field\">"
    + alias1(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n					<span class=\"field square\">"
    + alias1((helpers.svg || (depth0 && depth0.svg) || alias3).call(alias2,"arrow-right",{"name":"svg","hash":{},"data":data}))
    + "</span>\n				</div>\n			</a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.index,depth0,{"name":"index","hash":{"displaymode":"table","icon":(depth0 != null ? depth0.icon : depth0),"title":(depth0 != null ? depth0.title : depth0)},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"1_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"args":["menu"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"args":["actions"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"args":["content"],"data":data}) || fn;
  return fn;
  }

,"useDecorators":true,"usePartial":true,"useData":true,"useDepths":true});
templates['login'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"login\">\n	<div class=\"logo\">\n		<span class=\"sign\">\n			<svg id=\"star\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\">\n				<path fill=\"#ccc\" d=\"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z\"/>\n			</svg>\n		</span>\n		<span class=\"type\">Append</span>\n	</div>\n	<form action=\"logUser\" method=\"post\">\n		<div class=\"fields\">\n			<div><input name=\"mail\" type=\"text\" placeholder=\"Email\"/></div>\n			<div><input name=\"password\" type=\"password\" placeholder=\"Mot de passe\"/></div>\n		</div>\n		<button type=\"submit\" class=\"btn btn-primary connect\">Se connecter</button>\n	</form>\n	<div class=\"createAccount\">\n		<span click=\"popTemplate\" template=\"register\">Créer un compte</span>\n	</div>\n</div>";
},"useData":true});
templates['menu-full'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<a class=\"dropdown-item\" href=\"#\">Parcourir</a>\n<a class=\"dropdown-item\" href=\"#\">Modèles</a>\n<a class=\"dropdown-item\" href=\"#\">Propriétés</a>\n<a class=\"dropdown-item\" href=\"#\">Eléments</a>\n<a class=\"dropdown-item\" href=\"#\">Se déconnecter</a>";
},"useData":true});
templates['model'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials["list-navigation"],depth0,{"name":"list-navigation","hash":{"items":(depth0 != null ? depth0.properties : depth0),"subject":"property","action":(helpers.concat || (depth0 && depth0.concat) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"addPropertyToModel/",(depth0 != null ? depth0.id : depth0),{"name":"concat","hash":{},"data":data}),"icon":(depth0 != null ? depth0.icon : depth0),"title":(depth0 != null ? depth0.name : depth0)},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
templates['models'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials["list-navigation"],depth0,{"name":"list-navigation","hash":{"items":(depth0 != null ? depth0.models : depth0),"subject":"models","action":"addModel","icon":"triangle","title":"Types"},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
templates['modelsettings'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"icon":"close"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"icon":"done"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper;

  return "		<form action=\"updateModelSettings/\" method=\"post\">\n			<div class=\"element\">\n				<div class=\"field label\">Nom</div>\n				<div class=\"field value\">\n					<input type=\"text\" name=\"name\" value=\""
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data}) : helper)))
    + "\">\n				</div>\n			</div>\n			<div class=\"element\">\n				<div class=\"field label\">Icône</div>\n				<div class=\"field value\">\n"
    + ((stack1 = container.invokePartial(partials.dropdown,depth0,{"name":"dropdown","hash":{"class":"dropdown-menu-content","icon":(depth0 != null ? depth0.modelicon : depth0)},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "				</div>\n			</div>\n			<div class=\"element\">\n				<div class=\"field label\">Type</div>\n				<div class=\"field value\">\n"
    + ((stack1 = container.invokePartial(partials["button-group"],depth0,{"name":"button-group","hash":{"options":(depth0 != null ? depth0.types : depth0),"name":"type"},"data":data,"indent":"\t\t\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "				</div>\n			</div>\n			<div class=\"element\">\n				<div class=\"field label\">Affichage</div>\n				<div class=\"field value\">\n"
    + ((stack1 = container.invokePartial(partials["button-group"],depth0,{"name":"button-group","hash":{"options":(depth0 != null ? depth0.displaymodes : depth0),"name":"displaymode"},"data":data,"indent":"\t\t\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "				</div>\n			</div>\n		</form>\n";
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "";
},"8":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "							<span>"
    + alias3((helpers.svg || (depth0 && depth0.svg) || alias2).call(alias1,"star",{"name":"svg","hash":{},"data":data}))
    + "</span>\n							<span>"
    + alias3((helpers.svg || (depth0 && depth0.svg) || alias2).call(alias1,"book",{"name":"svg","hash":{},"data":data}))
    + "</span>\n							<span>"
    + alias3((helpers.svg || (depth0 && depth0.svg) || alias2).call(alias1,"folder",{"name":"svg","hash":{},"data":data}))
    + "</span>\n							<span>"
    + alias3((helpers.svg || (depth0 && depth0.svg) || alias2).call(alias1,"photo-library",{"name":"svg","hash":{},"data":data}))
    + "</span>\n							<span>"
    + alias3((helpers.svg || (depth0 && depth0.svg) || alias2).call(alias1,"book",{"name":"svg","hash":{},"data":data}))
    + "</span>\n							<span>"
    + alias3((helpers.svg || (depth0 && depth0.svg) || alias2).call(alias1,"star",{"name":"svg","hash":{},"data":data}))
    + "</span>\n							<span>"
    + alias3((helpers.svg || (depth0 && depth0.svg) || alias2).call(alias1,"folder",{"name":"svg","hash":{},"data":data}))
    + "</span>\n							<span>"
    + alias3((helpers.svg || (depth0 && depth0.svg) || alias2).call(alias1,"folder",{"name":"svg","hash":{},"data":data}))
    + "</span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.index,depth0,{"name":"index","hash":{"displaymode":"table","title":(depth0 != null ? depth0.name : depth0)},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"1_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"args":["menu"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"args":["actions"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"args":["content"],"data":data}) || fn;
  return fn;
  }

,"useDecorators":true,"7_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"args":["content"],"data":data}) || fn;
  return fn;
  }

,"usePartial":true,"useData":true,"useDepths":true});
templates['objectcard-new'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"click":"submitContentForm","icon":"done"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"click":"closePop","icon":"close"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {});

  return "		<form action=\"addNewObject/"
    + alias1(container.lambda(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.id : stack1), depth0))
    + "/"
    + alias1(((helper = (helper = helpers.parent || (depth0 != null ? depth0.parent : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias2,{"name":"parent","hash":{},"data":data}) : helper)))
    + "\" method=\"post\">\n"
    + ((stack1 = helpers.each.call(alias2,(depth0 != null ? depth0.properties : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</form>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.labeledvalue,depth0,{"name":"labeledvalue","data":data,"indent":"\t\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.index,depth0,{"name":"index","hash":{"filters":"off","icon":((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.icon : stack1),"title":((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.name : stack1),"displaymode":"table"},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"1_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"args":["actions"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"args":["menu"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"args":["content"],"data":data}) || fn;
  return fn;
  }

,"useDecorators":true,"usePartial":true,"useData":true,"useDepths":true});
templates['objectcard'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"click":"submitContentForm","icon":"done"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"click":"goBack","icon":"close"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.dropdown,depth0,{"name":"dropdown","hash":{"icon":"more"},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "";
},"8":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "				<div class=\"dropdown-item\">\n					<form action=\"emptyObject/"
    + alias4(((helper = (helper = helpers.object || (depth0 != null ? depth0.object : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"object","hash":{},"data":data}) : helper)))
    + "\"><button>Vider</button></form>\n				</div>\n				<div class=\"dropdown-item\">\n					<form action=\"removeObject/"
    + alias4(((helper = (helper = helpers.object || (depth0 != null ? depth0.object : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"object","hash":{},"data":data}) : helper)))
    + "\"><button class=\"reset\">Supprimer</button></form>\n				</div>\n";
},"10":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "		<form submit=\"sendForm\" action=\"updateObjectValues/"
    + container.escapeExpression(((helper = (helper = helpers.object || (depth0 != null ? depth0.object : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"object","hash":{},"data":data}) : helper)))
    + "\" method=\"post\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.properties : depth0),{"name":"each","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</form>\n";
},"11":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "				<div class=\"element\">\n					<div class=\"field square\">"
    + alias3((helpers.svg || (depth0 && depth0.svg) || alias2).call(alias1,(depth0 != null ? depth0.icon : depth0),{"name":"svg","hash":{},"data":data}))
    + "</div>\n					<div class=\"field label\">"
    + alias3(alias4((depth0 != null ? depth0.name : depth0), depth0))
    + "</div>\n					<div class=\"field value\" element=\""
    + alias3(alias4((depth0 != null ? depth0.element : depth0), depth0))
    + "\">"
    + alias3((helpers.getObjectCardElement || (depth0 && depth0.getObjectCardElement) || alias2).call(alias1,depth0,(depths[1] != null ? depths[1].object : depths[1]),{"name":"getObjectCardElement","hash":{},"data":data}))
    + "</div>\n				</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.index,depth0,{"name":"index","hash":{"view":"objectcard","filters":"off","displaymode":"table"},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"1_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"args":["actions"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"args":["menu"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"args":["otheractions"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"args":["content"],"data":data}) || fn;
  return fn;
  }

,"useDecorators":true,"7_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"args":["content"],"data":data}) || fn;
  return fn;
  }

,"usePartial":true,"useData":true,"useDepths":true});
templates['objectcontent-items'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression((helpers.setObjectContent || (depth0 && depth0.setObjectContent) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"setObjectContent","hash":{},"data":data}));
},"useData":true});
templates['objectcontent'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "";
},"2":function(container,depth0,helpers,partials,data) {
    return "			"
    + container.escapeExpression((helpers.setAddAction || (depth0 && depth0.setAddAction) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.models : depth0),{"name":"setAddAction","hash":{},"data":data}))
    + "\n";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.dropdown,depth0,{"name":"dropdown","hash":{"icon":"more"},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "";
},"6":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "				<span class=\"dropdown-item\" click=\"toggleSearchControl\">Rechercher</span>\n				<span class=\"dropdown-item\" click=\"toggleSortControl\">Trier par</span>\n				<span class=\"dropdown-item\" click=\"toggleFiltersControl\">Filtrer</span>\n				<div class=\"dropdown-divider\"></div>\n				<a class=\"dropdown-item\" href=\"/objects/"
    + alias4(((helper = (helper = helpers.parent || (depth0 != null ? depth0.parent : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"parent","hash":{},"data":data}) : helper)))
    + "/card\">Propriétés</a>\n				<a class=\"dropdown-item\" href=\"/objects/"
    + alias4(((helper = (helper = helpers.parent || (depth0 != null ? depth0.parent : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"parent","hash":{},"data":data}) : helper)))
    + "/roles\">Rôles</a>\n				<div class=\"dropdown-divider\"></div>\n				<span class=\"dropdown-item\" click=\"popTemplate\" template=\"objectshare\">Partager</span>\n				<a class=\"dropdown-item\" href=\"#\">Imprimer</a>\n				<div class=\"dropdown-item\" click=\"popTemplate\" template=\"objectimport\">Importer</div>\n";
},"8":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "		<form action=\"getParentContent/"
    + alias3(((helper = (helper = helpers.parent || (depth0 != null ? depth0.parent : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"parent","hash":{},"data":data}) : helper)))
    + "\" class=\"controls toggle\" scroll=\"infiniteScroll\">\n			<input type=\"hidden\" name=\"page\" value=\"1\">\n			<input type=\"submit\" style=\"position: absolute; left: -9999px\"/>\n			<div class=\"search\" active=\"true\">\n				"
    + alias3((helpers.svg || (depth0 && depth0.svg) || alias2).call(alias1,"search",{"name":"svg","hash":{},"data":data}))
    + "\n				<input type=\"text\" name=\"search\" placeholder=\"Rechercher...\">\n			</div>\n			<div class=\"sort\">\n				<label>Trier par </label>\n				<select name=\"sort-property\" class=\"form-control\" change=\"submitForm\">\n					<option value=\"id\" "
    + alias3((helpers.isSelected || (depth0 && depth0.isSelected) || alias2).call(alias1,"_id",((stack1 = (depth0 != null ? depth0.sort : depth0)) != null ? stack1.property : stack1),{"name":"isSelected","hash":{},"data":data}))
    + ">Date de création</option>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.properties : depth0),{"name":"each","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</select>\n				<div class=\"rollself square stack-button sort-order\" click=\"rollSelf\">\n					<div class=\"rollself-item\" active=\""
    + alias3((helpers.isActive || (depth0 && depth0.isActive) || alias2).call(alias1,"asc",((stack1 = (depth0 != null ? depth0.sort : depth0)) != null ? stack1.order : stack1),{"name":"isActive","hash":{},"data":data}))
    + "\">\n						<input type=\"radio\" name=\"sort-order\" value=\"desc\" "
    + alias3((helpers.isChecked || (depth0 && depth0.isChecked) || alias2).call(alias1,"desc",((stack1 = (depth0 != null ? depth0.sort : depth0)) != null ? stack1.order : stack1),{"name":"isChecked","hash":{},"data":data}))
    + " change=\"submitForm\" >\n"
    + ((stack1 = container.invokePartial(partials.svg,"arrow-upward-white",{"name":"svg","data":data,"indent":"\t\t\t\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "					</div>\n					<div class=\"rollself-item\" active=\""
    + alias3((helpers.isActive || (depth0 && depth0.isActive) || alias2).call(alias1,"desc",((stack1 = (depth0 != null ? depth0.sort : depth0)) != null ? stack1.order : stack1),{"name":"isActive","hash":{},"data":data}))
    + "\">\n						<input type=\"radio\" name=\"sort-order\" value=\"asc\" "
    + alias3((helpers.isChecked || (depth0 && depth0.isChecked) || alias2).call(alias1,"asc",((stack1 = (depth0 != null ? depth0.sort : depth0)) != null ? stack1.order : stack1),{"name":"isChecked","hash":{},"data":data}))
    + " change=\"submitForm\">\n"
    + ((stack1 = container.invokePartial(partials.svg,"arrow-downward-white",{"name":"svg","data":data,"indent":"\t\t\t\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "					</div>\n				</div>\n			</div>\n			<div class=\"filters roll\">\n				<span class=\"filters-content roll roll-scene\"></span>\n				<span class=\"filters-actions\">\n					<span class=\"badge stack-button badge-primary badge-pill roll-current\">0</span>\n					<span>\n"
    + ((stack1 = container.invokePartial(partials.action,depth0,{"name":"action","hash":{"click":"addFilter","icon":"add"},"data":data,"indent":"\t\t\t\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.action,depth0,{"name":"action","hash":{"click":"removeFilter","icon":"remove"},"data":data,"indent":"\t\t\t\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "					</span>\n				</span>\n			</div>\n		</form>\n";
},"9":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "						<option value=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" "
    + alias4((helpers.isSelected || (depth0 && depth0.isSelected) || alias2).call(alias1,(depth0 != null ? depth0._id : depth0),((stack1 = (depths[1] != null ? depths[1].sort : depths[1])) != null ? stack1.property : stack1),{"name":"isSelected","hash":{},"data":data}))
    + ">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials["objectcontent-items"],depth0,{"name":"objectcontent-items","data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.index,depth0,{"name":"index","hash":{"view":"objectcontent","filters":"on","model":(depth0 != null ? depth0.model : depth0),"name":"objectcontent"},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"1_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"args":["actions"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"args":["otheractions"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"args":["controls"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"args":["content"],"data":data}) || fn;
  return fn;
  }

,"useDecorators":true,"5_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"args":["content"],"data":data}) || fn;
  return fn;
  }

,"usePartial":true,"useData":true,"useDepths":true});
templates['objectimport-mapping'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "	<div class=\"element\">\n		<span class=\"field\">\n			<span>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n		</span>\n		<span class=\"field\">\n			<span>\n				<select name=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" class=\"form-control\">\n					<option value=\"\" selected>–</option>\n"
    + ((stack1 = helpers.each.call(alias1,(depths[1] != null ? depths[1].row : depths[1]),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</select>\n			</span>\n		</span>\n	</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.escapeExpression;

  return "						<option value=\""
    + alias1(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"index","hash":{},"data":data}) : helper)))
    + "\">"
    + alias1(container.lambda(depth0, depth0))
    + "</option>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.properties : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});
templates['objectimport'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"click":"submitContentForm","icon":"done"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"click":"closePop","icon":"close"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "		<form action=\"importCSV/"
    + alias3(((helper = (helper = helpers.parent || (depth0 != null ? depth0.parent : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"parent","hash":{},"data":data}) : helper)))
    + "\" method=\"post\" enctype=\"multipart/form-data\">\n			<div class=\"element\">\n				<div class=\"field label\">Fichier</div>\n				<div class=\"field\">\n					<div class=\"custom-file\">\n						<input name=\"file\" type=\"file\" class=\"custom-file-input\" change=\"updateImportMapping\">\n						<label class=\"custom-file-label\" for=\"customFile\">Fichier</label>\n					</div>\n				</div>\n			</div>\n			<input type=\"hidden\" name=\"model\" value=\""
    + alias3((helpers.getFirstKey || (depth0 && depth0.getFirstKey) || alias2).call(alias1,(depth0 != null ? depth0.models : depth0),{"name":"getFirstKey","hash":{},"data":data}))
    + "\">\n			<div class=\"separator\"></div>\n			<h3>Raccord</h3>\n			<div class=\"import-mapping\">\n"
    + ((stack1 = container.invokePartial(partials["objectimport-mapping"],depth0,{"name":"objectimport-mapping","hash":{"objectproperties":(depth0 != null ? depth0.properties : depth0)},"data":data,"indent":"\t\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "			</div>\n		</form>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.index,depth0,{"name":"index","hash":{"displaymode":"table","title":"Importer","icon":"download"},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"1_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"args":["actions"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"args":["menu"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"args":["content"],"data":data}) || fn;
  return fn;
  }

,"useDecorators":true,"usePartial":true,"useData":true,"useDepths":true});
templates['objectrole-actions'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"icon":"add"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"icon":"closePop"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.position,depth0,{"name":"position","hash":{"child":"Filtres","parent":((stack1 = (depth0 != null ? depth0.role : depth0)) != null ? stack1.name : stack1)},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "		<form action=\"updateObjectRoleFilters/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.id : stack1), depth0))
    + "/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.role : depth0)) != null ? stack1.id : stack1), depth0))
    + "\" method=\"post\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.filters : depth0),{"name":"each","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</form>\n";
},"9":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "				<div class=\"element condition\">\n					<span class=\"field\">\n						<span>"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</span>\n					</span>\n					<span class=\"field\">\n						<span>"
    + ((stack1 = container.invokePartial(partials.select,depth0,{"name":"select","hash":{"value":(depth0 != null ? depth0.operator : depth0),"options":(depths[1] != null ? depths[1].operators : depths[1]),"name":"operator","class":"operator"},"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</span>\n					</span>\n					<span class=\"field\">\n						<span class=\"value\">\n							<input type=\"text\" name=\""
    + alias2(alias1((depth0 != null ? depth0.property : depth0), depth0))
    + "\" value=\""
    + alias2(alias1((depth0 != null ? depth0.value : depth0), depth0))
    + "\">\n						</span>\n					</span>\n				</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.index,depth0,{"name":"index","hash":{"displaymode":"table","icon":"filter"},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"1_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"args":["actions"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"args":["menu"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"args":["head"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"args":["content"],"data":data}) || fn;
  return fn;
  }

,"useDecorators":true,"usePartial":true,"useData":true,"useDepths":true});
templates['objectrole-filters'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"icon":"close","click":"submitFormAndClosePop"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    return "		<button click=\"addElement\" element=\"filter-element\">"
    + container.escapeExpression((helpers.svg || (depth0 && depth0.svg) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"add-circle-blue",{"name":"svg","hash":{},"data":data}))
    + "</button>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.position,depth0,{"name":"position","hash":{"child":"Filtres","parent":((stack1 = ((stack1 = (depth0 != null ? depth0.objectrole : depth0)) != null ? stack1.role : stack1)) != null ? stack1.name : stack1)},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "		<form action=\"updateObjectRoleFilters/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.id : stack1), depth0))
    + "/"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.objectrole : depth0)) != null ? stack1.role : stack1)) != null ? stack1._id : stack1), depth0))
    + "\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.objectrole : depth0)) != null ? stack1.filters : stack1),{"name":"each","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</form>\n";
},"9":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials["filter-element"],depth0,{"name":"filter-element","hash":{"value":(depth0 != null ? depth0.value : depth0),"operator":(depth0 != null ? depth0.operator : depth0),"property":(depth0 != null ? depth0.property : depth0),"properties":(depths[1] != null ? depths[1].properties : depths[1])},"data":data,"indent":"\t\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.index,depth0,{"name":"index","hash":{"displaymode":"table","icon":((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.icon : stack1)},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"1_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"args":["menu"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"args":["actions"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"args":["head"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"args":["content"],"data":data}) || fn;
  return fn;
  }

,"useDecorators":true,"usePartial":true,"useData":true,"useDepths":true});
templates['objectrole-selection'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"icon":"close","click":"closePop"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"icon":"done","click":"submitContentForm"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.position,depth0,{"name":"position","hash":{"child":"Champs","parent":((stack1 = ((stack1 = (depth0 != null ? depth0.objectrole : depth0)) != null ? stack1.role : stack1)) != null ? stack1.name : stack1)},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "		<form action=\"updateRolePropertiesInObject/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.id : stack1), depth0))
    + "/"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.objectrole : depth0)) != null ? stack1.role : stack1)) != null ? stack1._id : stack1), depth0))
    + "\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.properties : depth0),{"name":"each","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</form>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "				<div class=\"element\">\n					<span class=\"field square\">\n						<input type=\"checkbox\" name=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n					</span>\n					<span class=\"field square\">"
    + alias4((helpers.svg || (depth0 && depth0.svg) || alias2).call(alias1,(depth0 != null ? depth0.icon : depth0),{"name":"svg","hash":{},"data":data}))
    + "</span>\n					<span class=\"field\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n				</div>\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "checked";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.index,depth0,{"name":"index","hash":{"displaymode":"table","icon":((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.icon : stack1)},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"1_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"args":["menu"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"args":["actions"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"args":["head"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"args":["content"],"data":data}) || fn;
  return fn;
  }

,"useDecorators":true,"usePartial":true,"useData":true,"useDepths":true});
templates['objectrole'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"click":"submitContentForm","icon":"done"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"click":"goBack","icon":"close"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.position,depth0,{"name":"position","hash":{"child":((stack1 = ((stack1 = (depth0 != null ? depth0.objectrole : depth0)) != null ? stack1.role : stack1)) != null ? stack1.name : stack1),"parent":((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.title : stack1)},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "		<form action=\"updateObjectRole/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.id : stack1), depth0))
    + "/"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.objectrole : depth0)) != null ? stack1.role : stack1)) != null ? stack1._id : stack1), depth0))
    + "\" method=\"post\">\n			<div class=\"element\">\n				<span class=\"field label\">Droit</span>\n				<span class=\"field\">"
    + ((stack1 = container.invokePartial(partials.select,depth0,{"name":"select","hash":{"options":(depth0 != null ? depth0.rights : depth0),"name":"right"},"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</span>\n			</div>\n			<div class=\"element\">\n				<span class=\"field label\">Champs visibles</span>\n				<span class=\"field\">\n					<a href=\"\" click=\"popTemplate\" template=\"objectrole-selection\">Titre, Date...</a>\n				</span>\n			</div>\n			<div class=\"element\">\n				<span class=\"field label\">Filtres</span>\n				<span class=\"field\">\n					<span click=\"popTemplate\" template=\"objectrole-filters\" class=\"badge badge-primary badge-pill\">1</span>\n				</span>\n			</div>\n		</form>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.index,depth0,{"name":"index","hash":{"displaymode":"table","icon":((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.icon : stack1)},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"1_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"args":["actions"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"args":["menu"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"args":["head"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"args":["content"],"data":data}) || fn;
  return fn;
  }

,"useDecorators":true,"usePartial":true,"useData":true,"useDepths":true});
templates['objectroles'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"icon":"close"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "		<form action=\"addRoleToObject/"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.id : stack1), depth0))
    + "\">\n"
    + ((stack1 = container.invokePartial(partials["dropdown-select"],depth0,{"name":"dropdown-select","hash":{"options":(depth0 != null ? depth0.roles : depth0),"change":"submitForm","icon":"add-circle-blue","name":"role"},"data":data,"indent":"\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "		</form>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.position,depth0,{"name":"position","hash":{"child":"Rôles","parent":((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.title : stack1)},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.objectroles : depth0),{"name":"each","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials["objectroles-element"],depth0,{"name":"objectroles-element","hash":{"roleid":(depth0 != null ? depth0._id : depth0),"objectid":((stack1 = (depths[1] != null ? depths[1].object : depths[1])) != null ? stack1.id : stack1)},"data":data,"indent":"\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.index,depth0,{"name":"index","hash":{"displaymode":"table","icon":((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.icon : stack1)},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"1_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"args":["menu"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"args":["actions"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"args":["head"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"args":["content"],"data":data}) || fn;
  return fn;
  }

,"useDecorators":true,"usePartial":true,"useData":true,"useDepths":true});
templates['objectshare'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"click":"submitContentForm","icon":"done"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"click":"closePop","icon":"close"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.position,depth0,{"name":"position","hash":{"child":"Partager","parent":(depths[1] != null ? depths[1].title : depths[1])},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "		<form action=\"shareObject/"
    + container.escapeExpression(((helper = (helper = helpers.parent || (depth0 != null ? depth0.parent : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"parent","hash":{},"data":data}) : helper)))
    + "\" method=\"post\">\n			<div class=\"element\">\n				<span class=\"field label square\">À:</span>\n				<span class=\"field\">\n					<input type=\"text\" name=\"emails\" placeholder=\"Adresses email...\">\n				</span>\n			</div>\n			<div class=\"element\">\n				<span class=\"field label\">Rôle</span>\n				<span class=\"field\">\n"
    + ((stack1 = container.invokePartial(partials.select,depth0,{"name":"select","hash":{"options":(depth0 != null ? depth0.roles : depth0),"name":"profile"},"data":data,"indent":"\t\t\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "				</span>\n			</div>\n		</form>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.index,depth0,{"name":"index","hash":{"displaymode":"table","title":"Partager","icon":(depth0 != null ? depth0.icon : depth0)},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"1_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"args":["actions"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"args":["menu"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"args":["head"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"args":["content"],"data":data}) || fn;
  return fn;
  }

,"useDecorators":true,"usePartial":true,"useData":true,"useDepths":true});
templates['objectusers'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"icon":"done"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"icon":"close"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.position,depth0,{"name":"position","hash":{"child":"Utilisateurs","parent":((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.title : stack1)},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.users : depth0),{"name":"each","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "			<div class=\"element\">\n				<span class=\"field\" property=\"user\">"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.name : depth0), depth0))
    + "</span>\n				<span class=\"field\" property=\"role\">\n"
    + ((stack1 = container.invokePartial(partials.select,depth0,{"name":"select","hash":{"value":(depth0 != null ? depth0.role : depth0),"options":(depths[1] != null ? depths[1].roles : depths[1]),"name":"role"},"data":data,"indent":"\t\t\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "				</span>\n			</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.index,depth0,{"name":"index","hash":{"displaymode":"table","icon":((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.icon : stack1),"title":"Utilisateurs"},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"1_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"args":["actions"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"args":["menu"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"args":["head"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"args":["content"],"data":data}) || fn;
  return fn;
  }

,"useDecorators":true,"usePartial":true,"useData":true,"useDepths":true});
templates['position'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<span class=\"object\">"
    + alias4(((helper = (helper = helpers.parent || (depth0 != null ? depth0.parent : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"parent","hash":{},"data":data}) : helper)))
    + "</span>\n<span>→</span>\n<span class=\"property\">"
    + alias4(((helper = (helper = helpers.child || (depth0 != null ? depth0.child : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"child","hash":{},"data":data}) : helper)))
    + "</span>";
},"useData":true});
templates['profile'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"icon":"done"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"icon":"close"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "		<form action=\"updateProfile\">\n			<div class=\"element\">\n				<span class=\"field label\">Nom</span>\n				<span class=\"field\">\n					<input type=\"text\" name=\"name\" value=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\">\n				</span>\n			</div>\n			<div class=\"element\">\n				<span class=\"field label\">Email</span>\n				<span class=\"field\">\n					<input type=\"text\" name=\"name\" value=\""
    + alias4(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data}) : helper)))
    + "\">\n				</span>\n			</div>\n			<div class=\"element\">\n				<span class=\"field label\">Mot de passe</span>\n				<span class=\"field\">\n					<button type=\"button\" class=\"btn btn-primary\">Modifier</button>\n				</span>\n			</div>\n		</form>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.index,depth0,{"name":"index","hash":{"displaymode":"table","icon":"account-circle","title":"Profil"},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"1_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"args":["actions"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"args":["menu"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"args":["content"],"data":data}) || fn;
  return fn;
  }

,"useDecorators":true,"usePartial":true,"useData":true,"useDepths":true});
templates['property'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"icon":"close"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"click":"submitContentForm","icon":"done"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "		<form action=\"updateProperty/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n			<div class=\"element\">\n				<span class=\"field label\">Nom</span>\n				<span class=\"field\">\n					<input type=\"text\" name=\"name\" value=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\">\n				</span>\n			</div>\n			<div class=\"element\">\n				<span class=\"field label\">Icône</span>\n				<span class=\"field\">\n					<input type=\"text\" name=\"icon\" value=\""
    + alias4(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\">\n				</span>\n			</div>\n			<div class=\"element\">\n				<span class=\"field label\">Element</span>\n				<span class=\"field\">"
    + ((stack1 = container.invokePartial(partials.select,depth0,{"name":"select","hash":{"options":(depth0 != null ? depth0.elements : depth0),"name":"element"},"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</span>\n			</div>\n		</form>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.index,depth0,{"name":"index","hash":{"displaymode":"table","icon":(depth0 != null ? depth0.icon : depth0),"title":(depth0 != null ? depth0.name : depth0)},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"1_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"args":["menu"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"args":["actions"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"args":["content"],"data":data}) || fn;
  return fn;
  }

,"useDecorators":true,"usePartial":true,"useData":true,"useDepths":true});
templates['register'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"login\">\n	<div class=\"logo\">\n		<span class=\"sign\">\n			<svg id=\"star\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\">\n				<path fill=\"#ccc\" d=\"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z\"/>\n			</svg>\n		</span>\n		<span class=\"type\">Append</span>\n	</div>\n	<form action=\"register\" submit=\"prevent\" method=\"post\">\n		<div class=\"fields\">\n			<div><input name=\"name\" type=\"text\" placeholder=\"Name\"/></div>\n			<div><input name=\"mail\" type=\"text\" placeholder=\"Email\"/></div>\n			<div><input name=\"password\" type=\"password\" placeholder=\"Mot de passe\"/></div>\n			<div><input name=\"passwordconfirm\" type=\"password\" placeholder=\"Confirmation\" keyup=\"submitParentFormOnEnter\"/></div>\n		</div>\n		<button class=\"submit\" class=\"button\" click=\"submitParentForm\">Créer un compte</button>\n	</form>\n</div>";
},"useData":true});
templates['source-dropbox'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"icon":"done"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"icon":"close"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return "		<form action=\"updateHost/"
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n			<div class=\"element\">\n				<span class=\"field label\">Utilisateur</span>\n				<span class=\"field\" property=\"role\">\n					<input type=\"text\" name=\"host\" value=\"\"/>\n				</span>\n			</div>\n			<div class=\"element\">\n				<span class=\"field label\">Mot de passe</span>\n				<span class=\"field\" property=\"role\">\n					<input type=\"text\" name=\"host\" value=\"\"/>\n				</span>\n			</div>\n		</form>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.index,depth0,{"name":"index","hash":{"displaymode":"table","icon":"import-export","title":"Dropbox"},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"1_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"args":["actions"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"args":["menu"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"args":["content"],"data":data}) || fn;
  return fn;
  }

,"useDecorators":true,"usePartial":true,"useData":true,"useDepths":true});
templates['source-ftp'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"icon":"done"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"icon":"close"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return "		<form action=\"updateHost/"
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n			<div class=\"element\">\n				<span class=\"field label\">Hôte</span>\n				<span class=\"field\" property=\"role\">\n					<input type=\"text\" name=\"host\" value=\"\"/>\n				</span>\n			</div>\n			<div class=\"element\">\n				<span class=\"field label\">Utilisateur</span>\n				<span class=\"field\" property=\"role\">\n					<input type=\"text\" name=\"host\" value=\"\"/>\n				</span>\n			</div>\n			<div class=\"element\">\n				<span class=\"field label\">Mot de passe</span>\n				<span class=\"field\" property=\"role\">\n					<input type=\"text\" name=\"host\" value=\"\"/>\n				</span>\n			</div>\n			<div class=\"element\">\n				<span class=\"field label\">Chemin</span>\n				<span class=\"field\" property=\"role\">\n					<input type=\"text\" name=\"host\" value=\"\"/>\n				</span>\n			</div>\n			<div class=\"element\">\n				<span class=\"field label\">Port</span>\n				<span class=\"field\" property=\"role\">\n					<input type=\"text\" name=\"host\" value=\"\"/>\n				</span>\n			</div>\n		</form>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.index,depth0,{"name":"index","hash":{"displaymode":"table","icon":"import-export","title":"FTP"},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"1_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"args":["actions"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"args":["menu"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"args":["content"],"data":data}) || fn;
  return fn;
  }

,"useDecorators":true,"usePartial":true,"useData":true,"useDepths":true});
templates['userobjects'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials["actions-objectcontent"],depth0,{"name":"actions-objectcontent","data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.objects : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "			<a href=\"objects/"
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">\n				<div class=\"element\">\n					<span class=\"icon\">"
    + alias2((helpers.svg || (depth0 && depth0.svg) || alias4).call(alias3,(depth0 != null ? depth0.icon : depth0),{"name":"svg","hash":{},"data":data}))
    + "</span>\n					<span class=\"title\">"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</span>\n					<span class=\"act\">"
    + alias2((helpers.svg || (depth0 && depth0.svg) || alias4).call(alias3,"arrow-right",{"name":"svg","hash":{},"data":data}))
    + "</span>\n				</div>\n			</a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.index,depth0,{"name":"index","hash":{"displaymode":"table","icon":"home"},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"1_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"args":["actions"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"args":["content"],"data":data}) || fn;
  return fn;
  }

,"useDecorators":true,"usePartial":true,"useData":true,"useDepths":true});
})();