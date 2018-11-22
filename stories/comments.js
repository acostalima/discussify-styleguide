import React from 'react';
import { storiesOf } from '@storybook/react';
// import { withKnobs, boolean, selectV2, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withReadme } from 'storybook-readme';
import { Comment, CommentError, CommentInput, CommentPlaceholder, CommentFrame } from '../src';
import commentReadme from '../src/components/comment/README.md';
import commentPlaceholderReadme from '../src/components/comment-placeholder/README.md';
import commentErrorReadme from '../src/components/comment-error/README.md';
import commentInputReadme from '../src/components/comment-input/README.md';
import commentFrameReadme from '../src/components/comment-frame/README.md';

const comment = {
    author: {
        did: 'did:uport:2odP6zYTh8K95xztx3qpf3RishNXdUFCkH6',
        avatar: 'https://ipfs.infura.io/ipfs/Qme2BurB5BFTLxTqmjUBu7qgsE96iCpf6iJD9MurhBRoSC',
        name: 'André Cruz',
    },
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut rhoncus orci. Nulla non malesuada augue.',
    createdAt: Date.now() - (60 * 5 * 1000),
};

const style = { width: 400 };

storiesOf('Comment', module)
.addDecorator(withReadme(commentReadme))
.add('Default', () => (
    <Comment
        comment={ comment }
        onReply={ action('reply') }
        style={ style } />
))
.add('Edited', () => (
    <Comment
        comment={ { ...comment, updatedAt: Date.now() } }
        onReply={ action('reply') }
        style={ style } />
))
.add('Removed', () => (
    <Comment
        comment={ { ...comment, body: null } }
        onReply={ action('reply') }
        style={ style } />
))
.add('Is owner', () => (
    <Comment
        comment={ comment }
        owner
        onReply={ action('reply') }
        onEdit={ action('edit') }
        onRemove={ action('remove') }
        style={ style } />
));

storiesOf('CommentPlaceholder', module)
.addDecorator(withReadme(commentPlaceholderReadme))
.add('Default', () => (
    <CommentPlaceholder style={ style } />
));

storiesOf('CommentError', module)
.addDecorator(withReadme(commentErrorReadme))
.add('Default', () => (
    <CommentError
        onRetry={ action('retry') }
        style={ style } />
));

storiesOf('CommentInput', module)
.addDecorator(withReadme(commentInputReadme))
.add('New reply', () => (
    <CommentInput
        type="reply"
        author={ comment.author }
        onSubmit={ action('submit') }
        onCancel={ action('cancel') }
        style={ style } />
))
.add('Editing', () => (
    <CommentInput
        type="edit"
        body={ comment.body }
        author={ comment.author }
        onSubmit={ action('submit') }
        onCancel={ action('cancel') }
        style={ style } />
));

storiesOf('CommentFrame', module)
.addDecorator(withReadme(commentFrameReadme))
.add('Default', () => (
    <CommentFrame style={ style }>
        <Comment comment={ comment } onReply={ action('reply') } />
    </CommentFrame>
))
.add('Is reply', () => (
    <CommentFrame
        reply
        replyTo={ comment.author }
        style={ style }>
        <Comment comment={ comment } onReply={ action('reply') } />
    </CommentFrame>
))
.add('Is reply (placeholder)', () => (
    <CommentFrame
        reply
        style={ style }>
        <CommentPlaceholder />
    </CommentFrame>
))
.add('Has replies', () => (
    <CommentFrame
        replies
        repliesCount={ { total: 2, viewMore: 2 } }
        onViewMoreReplies={ action('view-more-replies') }
        style={ style }>
        <Comment comment={ comment } onReply={ action('reply') } />
    </CommentFrame>
))
.add('Has more replies', () => (
    <CommentFrame
        replies
        repliesCount={ { total: 2, viewMore: 1 } }
        onViewMoreReplies={ action('view-more-replies') }
        style={ style }>
        <Comment comment={ comment } onReply={ action('reply') } />
    </CommentFrame>
))
.add('Has single reply', () => (
    <CommentFrame
        replies
        repliesCount={ { total: 1, viewMore: 1 } }
        onViewMoreReplies={ action('view-more-replies') }
        style={ style }>
        <Comment comment={ comment } onReply={ action('reply') } />
    </CommentFrame>
))
.add('Has replies (placeholder)', () => (
    <CommentFrame
        replies
        style={ style }>
        <CommentPlaceholder />
    </CommentFrame>
));
