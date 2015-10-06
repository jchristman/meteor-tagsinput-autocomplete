AutoForm.addInputType("tagsinput-autocomplete", {
    template: "tagsinput",
    valueOut: function() {
        return TagsInput.valueOut.apply(this);
    }
});

TagsInput.defaultValueOut = function() {
    var out = [];
    this.find('.tagsinput-value').each(function() {
        out.push($(this).html());
    });
    return out;
}

TagsInput.valueOut = TagsInput.defaultValueOut;
