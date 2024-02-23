const {Schema,model} = require('mongoose')

const thoughtSchema = new Schema(
    {
        thought: {
            type: String,
            required: true,
            maxlength: 280,
            minlength:1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: Date().toString(),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});