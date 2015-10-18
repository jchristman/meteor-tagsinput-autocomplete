AutoForm.addInputType("tagsinput-autocomplete", {
    template: "tagsinput",
    valueOut: function() {
        return TagsInput.valueOut.apply(this);
    }
});

TagsInput.defaultValueOut = function() {
    var out = [];
    this.find('.tagsinput-value').each(function() {
        out.push(Blaze.getData(this));
    });
    Tags.set(Blaze.getData(this.get(0)).tagId, []);
    return out;
}

TagsInput.valueOut = TagsInput.defaultValueOut;
