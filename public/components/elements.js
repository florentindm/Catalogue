(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['action'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<span click=\""
    + alias4(((helper = (helper = helpers.click || (depth0 != null ? depth0.click : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"click","hash":{},"data":data}) : helper)))
    + "\" class=\""
    + alias4(((helper = (helper = helpers["class"] || (depth0 != null ? depth0["class"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"class","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4((helpers.svg || (depth0 && depth0.svg) || alias2).call(alias1,(depth0 != null ? depth0.icon : depth0),{"name":"svg","hash":{},"data":data}))
    + "</span>";
},"useData":true});
templates['album'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "		<div class=\"vignette\" style=\"background-image:url('uploads/"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "')\"></div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"imageviewer roll\" index=\"0\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});
templates['badge-pill'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<span class=\"badge badge-primary badge-pill\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</span>";
},"useData":true});
templates['button-filechooser-icon'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"button-filechooser-icon stack\">\n	<input type=\"file\" name=\"files\" class=\"stack-input\" change=\"submitForm\" multiple=\"multiple\">\n	<div class=\"button-filechooser-icon\" class=\"stack-show\">\n"
    + ((stack1 = container.invokePartial(partials.svg,(depth0 != null ? depth0.icon : depth0),{"name":"svg","data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "	</div>\n</div>";
},"usePartial":true,"useData":true});
templates['button-group-multi'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "		<label class=\"btn btn-default "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n			<input type=\"checkbox\" name=\""
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias3(container.lambda((depth0 != null ? depth0.value : depth0), depth0))
    + "\" autocomplete=\"off\" "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">"
    + alias3((helpers.svg || (depth0 && depth0.svg) || alias2).call(alias1,(depth0 != null ? depth0.icon : depth0),{"name":"svg","hash":{},"data":data}))
    + "\n		</label>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "active";
},"4":function(container,depth0,helpers,partials,data) {
    return "checked";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"btn-group btn-group-toggle icon-group\" data-toggle=\"buttons\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.options : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});
templates['button-group'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda;

  return "		<label class=\"btn btn-secondary "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n			<input type=\"radio\" name=\""
    + alias2(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias2(alias3((depth0 != null ? depth0.value : depth0), depth0))
    + "\" autocomplete=\"off\" "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">"
    + alias2(alias3((depth0 != null ? depth0.text : depth0), depth0))
    + "\n		</label>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "active";
},"4":function(container,depth0,helpers,partials,data) {
    return "checked";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"btn-group btn-group-toggle\" data-toggle=\"buttons\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.options : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});
templates['button'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<button click=\""
    + alias3(((helper = (helper = helpers.click || (depth0 != null ? depth0.click : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"click","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3((helpers.svg || (depth0 && depth0.svg) || alias2).call(alias1,(depth0 != null ? depth0.icon : depth0),{"name":"svg","hash":{},"data":data}))
    + "</button>";
},"useData":true});
templates['checkedit'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "<div class=\"element\">\n	<span class=\"field square\">"
    + alias3((helpers.svg || (depth0 && depth0.svg) || alias2).call(alias1,(depth0 != null ? depth0.icon : depth0),{"name":"svg","hash":{},"data":data}))
    + "</span>\n	<span class=\"field\">"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n	<span class=\"field square\">\n		<a href=\"property/"
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"> \n"
    + ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"icon":"options"},"data":data,"indent":"\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "		</a>\n	</span>\n</div>";
},"usePartial":true,"useData":true});
templates['checklist'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "";
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return "		"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"title","hash":{},"data":data}) : helper)))
    + "\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.options : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "			<a class=\"dropdown-item\" href=\"#\">\n				<input type=\"checkbox\" value=\""
    + alias2(alias1((depth0 != null ? depth0.value : depth0), depth0))
    + "\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "/>\n				<span>"
    + alias2(alias1((depth0 != null ? depth0.text : depth0), depth0))
    + "</span>\n			</a>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "checked";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.dropdown,depth0,{"name":"dropdown","hash":{"onchange":"updateChecklistButton"},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"1_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"args":["droptitle"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"args":["content"],"data":data}) || fn;
  return fn;
  }

,"useDecorators":true,"usePartial":true,"useData":true,"useDepths":true});
templates['dimension'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<span class=\"width\">"
    + alias4(((helper = (helper = helpers["8070987082"] || (depth0 != null ? depth0["8070987082"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"8070987082","hash":{},"data":data}) : helper)))
    + "</span>\n<span class=\"multiplier\">x</span>\n<span class=\"height\">"
    + alias4(((helper = (helper = helpers["8070987082"] || (depth0 != null ? depth0["8070987082"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"8070987082","hash":{},"data":data}) : helper)))
    + "</span>";
},"useData":true});
templates['dropdown-select'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.options : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=helpers.helperMissing, alias4="function";

  return "			<div class=\"dropdown-item\">\n				<input class=\"dropdown-item-input\" type=\"radio\" name=\""
    + alias1(container.lambda((depths[1] != null ? depths[1].name : depths[1]), depth0))
    + "\" value=\""
    + alias1(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n				<span class=\"dropdown-item-text\">"
    + alias1(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n			</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.dropdown,depth0,{"name":"dropdown","hash":{"class":"dropdown-select","icon":(depth0 != null ? depth0.icon : depth0)},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"1_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"args":["content"],"data":data}) || fn;
  return fn;
  }

,"useDecorators":true,"usePartial":true,"useData":true,"useDepths":true});
templates['dropdown'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "			"
    + container.escapeExpression((helpers.svg || (depth0 && depth0.svg) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.icon : depth0),{"name":"svg","hash":{},"data":data}))
    + "\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"dropdown action\">\n	<button class=\"btn btn-default dropdown-toggle "
    + alias4(((helper = (helper = helpers.state || (depth0 != null ? depth0.state : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"state","hash":{},"data":data}) : helper)))
    + "\" type=\"button\" id=\"dropdownMenuButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n"
    + ((stack1 = container.invokePartial(partials.droptitle,depth0,{"name":"droptitle","fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "	</button>\n	<div class=\"dropdown-menu "
    + alias4(((helper = (helper = helpers["class"] || (depth0 != null ? depth0["class"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"class","hash":{},"data":data}) : helper)))
    + "\" aria-labelledby=\"dropdownMenuButton\" click=\""
    + alias4(((helper = (helper = helpers.onchange || (depth0 != null ? depth0.onchange : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"onchange","hash":{},"data":data}) : helper)))
    + "\">\n		"
    + ((stack1 = container.invokePartial(partials.content,depth0,{"name":"content","fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\n	</div>\n</div>";
},"usePartial":true,"useData":true});
templates['filebrowser'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"custom-file\">\n  <input type=\"file\" class=\"custom-file-input\" id=\"customFile\">\n  <label class=\"custom-file-label\" for=\"customFile\">Fichier</label>\n</div>";
},"useData":true});
templates['filter-condition-boolean'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<input type=\"checkbox\" name=\"value\">";
},"useData":true});
templates['filter-condition-integer'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<select name=\"operator\">\n	<option value=\"eq\" "
    + alias3((helpers.isSelected || (depth0 && depth0.isSelected) || alias2).call(alias1,"eq",(depth0 != null ? depth0.operator : depth0),{"name":"isSelected","hash":{},"data":data}))
    + ">égal à</option>\n	<option value=\"neq\" "
    + alias3((helpers.isSelected || (depth0 && depth0.isSelected) || alias2).call(alias1,"neq",(depth0 != null ? depth0.operator : depth0),{"name":"isSelected","hash":{},"data":data}))
    + ">différent de</option>\n	<option value=\"gt\" "
    + alias3((helpers.isSelected || (depth0 && depth0.isSelected) || alias2).call(alias1,"gt",(depth0 != null ? depth0.operator : depth0),{"name":"isSelected","hash":{},"data":data}))
    + ">plus grand que</option>\n	<option value=\"st\" "
    + alias3((helpers.isSelected || (depth0 && depth0.isSelected) || alias2).call(alias1,"st",(depth0 != null ? depth0.operator : depth0),{"name":"isSelected","hash":{},"data":data}))
    + ">plus petit que</option>\n</select>\n<input type=\"text\" name=\"value\" placeholder=\"123...\" change=\"restrictInteger\" size=\"10\">";
},"useData":true});
templates['filter-condition-string'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<select name=\"operator\">\n	<option value=\"ctn\" "
    + alias3((helpers.isSelected || (depth0 && depth0.isSelected) || alias2).call(alias1,"ctn",(depth0 != null ? depth0.operator : depth0),{"name":"isSelected","hash":{},"data":data}))
    + ">contient</option>\n	<option value=\"eq\" "
    + alias3((helpers.isSelected || (depth0 && depth0.isSelected) || alias2).call(alias1,"eq",(depth0 != null ? depth0.operator : depth0),{"name":"isSelected","hash":{},"data":data}))
    + ">égal à</option>\n	<option value=\"ne\" "
    + alias3((helpers.isSelected || (depth0 && depth0.isSelected) || alias2).call(alias1,"ne",(depth0 != null ? depth0.operator : depth0),{"name":"isSelected","hash":{},"data":data}))
    + ">différent de</option>\n</select>\n<input type=\"text\" name=\"value\" value=\""
    + alias3(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"value","hash":{},"data":data}) : helper)))
    + "\" placeholder=\"Blabla...\" size=\"10\" value=\"\">";
},"useData":true});
templates['filter-element'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=helpers.helperMissing;

  return alias2(helpers.log.call(alias1,depth0,"Filter - Element",{"name":"log","hash":{},"data":data}))
    + "\n<div class=\"element\">\n	<span class=\"field square\">"
    + alias2((helpers.svg || (depth0 && depth0.svg) || alias3).call(alias1,"drag-handle",{"name":"svg","hash":{},"data":data}))
    + "</span>\n	<span class=\"field\">"
    + ((stack1 = container.invokePartial(partials.filter,depth0,{"name":"filter","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</span>\n	<span class=\"field square\">\n		<span click=\"removeParentElement\">"
    + alias2((helpers.svg || (depth0 && depth0.svg) || alias3).call(alias1,"delete",{"name":"svg","hash":{},"data":data}))
    + "</span>\n	</span>\n</div>";
},"usePartial":true,"useData":true});
templates['filter'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "			<option value=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" type=\""
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "\" "
    + alias4((helpers.isSelected || (depth0 && depth0.isSelected) || alias2).call(alias1,(depth0 != null ? depth0._id : depth0),(depths[1] != null ? depths[1].property : depths[1]),{"name":"isSelected","hash":{},"data":data}))
    + ">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<span class=\"filter\">\n	<select name=\"property\" change=\"onFilterPropertyChange\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.properties : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</select>\n	<span class=\"condition\">\n"
    + ((stack1 = container.invokePartial(partials["filter-condition-string"],depth0,{"name":"filter-condition-string","data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "	</span>\n</span>";
},"usePartial":true,"useData":true,"useDepths":true});
templates['label-value'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"element\">\n	<span class=\"field\">"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "</span>\n	<span class=\"field\">"
    + alias4(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data}) : helper)))
    + "</span>\n</div>";
},"useData":true});
templates['labeledvalue'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<div class=\"element\">\n	<div class=\"field square\">"
    + alias3((helpers.svg || (depth0 && depth0.svg) || alias2).call(alias1,(depth0 != null ? depth0.icon : depth0),{"name":"svg","hash":{},"data":data}))
    + "</div>\n	<div class=\"field label\">"
    + alias3(container.lambda((depth0 != null ? depth0.name : depth0), depth0))
    + "</div>\n	<div class=\"field value\" element=\""
    + alias3(((helper = (helper = helpers.element || (depth0 != null ? depth0.element : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"element","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3((helpers.getObjectCardElement || (depth0 && depth0.getObjectCardElement) || alias2).call(alias1,depth0,(depths[1] != null ? depths[1].object : depths[1]),{"name":"getObjectCardElement","hash":{},"data":data}))
    + "</div>\n</div>";
},"useData":true,"useDepths":true});
templates['link'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<a href=\"#\">"
    + container.escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"value","hash":{},"data":data}) : helper)))
    + "</a>";
},"useData":true});
templates['menu-full'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<a class=\"dropdown-item\" href=\"/objects\">Parcourir</a>\n<a class=\"dropdown-item\" href=\"/models\">Types</a>\n<div class=\"dropdown-divider\"></div>\n<a class=\"dropdown-item\" href=\"/account\">Compte</a>\n<div class=\"dropdown-item\">\n	<form action=\"logout\" submit=\"prevent\">\n		<input type=\"submit\" value=\"Se déconnecter\">\n	</form>\n</div>";
},"useData":true});
templates['number'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<span>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</span>";
},"useData":true});
templates['objectcard-album'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<div class=\"button-filechooser-icon stack\">\n	<input name=\""
    + alias3(((helper = (helper = helpers.property || (depth0 != null ? depth0.property : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"property","hash":{},"data":data}) : helper)))
    + "\" class=\"stack-input\" click=\"popTemplate\" template=\"objectproperty-album\">\n	<div class=\"photostack stack-show\" style=\"background-image:url('uploads/"
    + alias3((helpers.firstItem || (depth0 && depth0.firstItem) || alias2).call(alias1,(depth0 != null ? depth0.value : depth0),{"name":"firstItem","hash":{},"data":data}))
    + "')\"></div>\n</div>";
},"useData":true});
templates['objectcard-checkbox'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "<div class=\"rollself square\" index=\""
    + alias3((helpers.ifEqual || (depth0 && depth0.ifEqual) || alias2).call(alias1,(depth0 != null ? depth0.value : depth0),"true","0","1",{"name":"ifEqual","hash":{},"data":data}))
    + "\" click=\"rollSelf\">\n	<div class=\"rollself-item\" active=\""
    + alias3((helpers.ifEqual || (depth0 && depth0.ifEqual) || alias2).call(alias1,(depth0 != null ? depth0.value : depth0),"true","true","false",{"name":"ifEqual","hash":{},"data":data}))
    + "\">\n		<input type=\"radio\" name=\""
    + alias3(((helper = (helper = helpers.property || (depth0 != null ? depth0.property : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"property","hash":{},"data":data}) : helper)))
    + "\" value=\"false\" "
    + alias3((helpers.ifEqual || (depth0 && depth0.ifEqual) || alias2).call(alias1,(depth0 != null ? depth0.value : depth0),"true","checked","",{"name":"ifEqual","hash":{},"data":data}))
    + "/>\n"
    + ((stack1 = container.invokePartial(partials.svg,"pastille-on",{"name":"svg","data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "	</div>\n	<div class=\"rollself-item\" active=\""
    + alias3((helpers.ifEqual || (depth0 && depth0.ifEqual) || alias2).call(alias1,(depth0 != null ? depth0.value : depth0),"false","true","false",{"name":"ifEqual","hash":{},"data":data}))
    + "\">\n		<input type=\"radio\" name=\""
    + alias3(((helper = (helper = helpers.property || (depth0 != null ? depth0.property : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"property","hash":{},"data":data}) : helper)))
    + "\" value=\"true\" "
    + alias3((helpers.ifEqual || (depth0 && depth0.ifEqual) || alias2).call(alias1,(depth0 != null ? depth0.value : depth0),"false","checked","",{"name":"ifEqual","hash":{},"data":data}))
    + "/>\n"
    + ((stack1 = container.invokePartial(partials.svg,"pastille-off",{"name":"svg","data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "	</div>\n</div>";
},"usePartial":true,"useData":true});
templates['objectcard-list'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\"objects/"
    + alias4(((helper = (helper = helpers.object || (depth0 != null ? depth0.object : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"object","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.property || (depth0 != null ? depth0.property : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"property","hash":{},"data":data}) : helper)))
    + "\">\n	<span>"
    + alias4(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data}) : helper)))
    + "</span>\n</a>";
},"useData":true});
templates['objectcard-number'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<input type=\"text\" name=\""
    + alias4(((helper = (helper = helpers.property || (depth0 != null ? depth0.property : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"property","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias4(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data}) : helper)))
    + "\" placeholder=\"123...\"/>";
},"useData":true});
templates['objectcard-text'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "<input type=\"text\" name=\""
    + alias2(alias1((depth0 != null ? depth0.property : depth0), depth0))
    + "\" value=\""
    + alias2(alias1((depth0 != null ? depth0.value : depth0), depth0))
    + "\" placeholder=\"Aa...\" />";
},"useData":true});
templates['objectproperty-album-item-loading'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"element image\">\n	<input class=\"selector\" click=\"checkForDelete\" type=\"checkbox\" name=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n	<div class=\"vignette squareratio\" title=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" style=\"background-image:url('uploads/"
    + alias4(container.lambda(depth0, depth0))
    + "')\">\n		<div class=\"progressbar\" active=\"false\">\n			<div class=\"done\"></div>\n		</div>\n	</div>\n</div>";
},"useData":true});
templates['objectproperty-album-item'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"element image\">\n	<input class=\"selector\" click=\"checkForDelete\" type=\"checkbox\" name=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n	<div class=\"vignette squareratio\" title=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" style=\"background-image:url('uploads/"
    + alias4(((helper = (helper = helpers.src || (depth0 != null ? depth0.src : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"src","hash":{},"data":data}) : helper)))
    + "')\"></div>\n</div>";
},"useData":true});
templates['objectproperty-album'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"click":"closePop","icon":"close"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.position,depth0,{"name":"position","hash":{"child":"Photos","parent":(depth0 != null ? depth0.title : depth0)},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "		<div class=\"toggle\">\n			<div class=\"global\" active=\"true\">\n					<span class=\"addfiles\">"
    + container.escapeExpression((helpers.svg || (depth0 && depth0.svg) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"add-circle-blue",{"name":"svg","hash":{},"data":data}))
    + "</span>\n				</form>\n			</div>\n			<div class=\"specific\">\n"
    + ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"click":"removeCheckedElements","icon":"delete"},"data":data,"indent":"\t\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "			</div>\n		</div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.value : depth0),{"name":"each","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.escapeExpression, alias2=container.lambda;

  return "			<div class=\"element image\">\n				<input class=\"selector\" click=\"checkForDelete\" type=\"checkbox\" name=\""
    + alias1(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n				<div class=\"vignette squareratio\" title=\""
    + alias1(alias2(depth0, depth0))
    + "\" style=\"background-image:url('uploads/"
    + alias1(alias2(depth0, depth0))
    + "')\"></div>\n			</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.index,depth0,{"name":"index","hash":{"view":"objectproperty-album","name":"objectproperty-album","displaymode":"grid"},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"1_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"args":["menu"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"args":["head"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"args":["actions"],"data":data}) || fn;
  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"args":["content"],"data":data}) || fn;
  return fn;
  }

,"useDecorators":true,"usePartial":true,"useData":true,"useDepths":true});
templates['objectroles-element'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\"objects/"
    + alias4(((helper = (helper = helpers.objectid || (depth0 != null ? depth0.objectid : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"objectid","hash":{},"data":data}) : helper)))
    + "/roles/"
    + alias4(((helper = (helper = helpers.roleid || (depth0 != null ? depth0.roleid : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"roleid","hash":{},"data":data}) : helper)))
    + "\">\n	<div class=\"element\">\n		<span class=\"field square\">"
    + alias4((helpers.svg || (depth0 && depth0.svg) || alias2).call(alias1,(depth0 != null ? depth0.icon : depth0),{"name":"svg","hash":{},"data":data}))
    + "</span>\n		<span class=\"field\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n		<span class=\"field square\">"
    + alias4((helpers.svg || (depth0 && depth0.svg) || alias2).call(alias1,"arrow-right",{"name":"svg","hash":{},"data":data}))
    + "</span>\n	</div>\n</a>";
},"useData":true});
templates['property-element-new'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"element\">\n	<span class=\"field square\">\n		<input type=\"checkbox\" click=\"checkForDelete\" name=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n	</span>\n	<span class=\"field\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n	<span class=\"field square\">\n		<a href=\"property/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"> \n"
    + ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"icon":"options"},"data":data,"indent":"\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "		</a>\n	</span>\n</div>";
},"usePartial":true,"useData":true});
templates['select'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "		<option value=\""
    + alias2(alias1((depth0 != null ? depth0.value : depth0), depth0))
    + "\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">"
    + alias2(alias1((depth0 != null ? depth0.text : depth0), depth0))
    + "</option>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "selected";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<select name=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\"form-control "
    + alias4(((helper = (helper = helpers["class"] || (depth0 != null ? depth0["class"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"class","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.options : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</select>";
},"useData":true});
templates['svg'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<img src=\"assets/"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + ".svg\"/>";
},"useData":true});
templates['text'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<span>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</span>";
},"useData":true});
templates['textinput'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<input type=\"text\" value=\""
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "\"/>";
},"useData":true});
templates['toggle-add-delete'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"toggle\">\n	<div class=\"global\" active=\"true\">\n		<form action=\""
    + container.escapeExpression(((helper = (helper = helpers.addaction || (depth0 != null ? depth0.addaction : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"addaction","hash":{},"data":data}) : helper)))
    + "\" enctype=\"multipart/form-data\">\n"
    + ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"icon":"add"},"data":data,"indent":"\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "		</form>\n	</div>\n	<div class=\"specific\">\n"
    + ((stack1 = container.invokePartial(partials.button,depth0,{"name":"button","hash":{"click":"submitContentForm","icon":"delete"},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "	</div>\n</div>";
},"usePartial":true,"useData":true});
templates['vignette'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"vignette\" style=\"background-image:url('uploads/"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "')\"></div>";
},"useData":true});
})();