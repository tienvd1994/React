import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// css.
import '../../../node_modules/toastr/build/toastr.min.css';

// js.
import axios from 'axios';
import $ from 'jquery';
import toastr from 'toastr';
import 'jquery-validation';
import 'codemirror';
import summernote from 'summernote';

import '../../../node_modules/summernote/dist/summernote.css';

import * as categoriesNewsActions from './../../actions/categoriesNewsActions';
import * as newsActions from './../../actions/newsActions';

class AddNewsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Id: 0,
            Name: '',
            ShortDescription: '',
            FullDescription: '',
            Published: true,
            CategoryId: 0,
            ImageUrl: ''
        }

        this.handlePublished = this.handlePublished.bind(this);
        this.handleUploadFile = this.handleUploadFile.bind(this);
        this.handleChangeShortDescription = this.handleChangeShortDescription.bind(this);
        this.handleChangeCategoryId = this.handleChangeCategoryId.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeFullDescription = this.handleChangeFullDescription.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {
        $(function () {
            $("form[name='editForm']").validate({
                rules: {
                    name: "required",
                    categoryId: "required",
                },
                submitHandler: function (form) {
                    form.submit();
                }
            });

            $('#fulldescription').summernote({
                height: 150
            });
        });

        this.props.categoriesNewsActions.loadCategoriesNewsAll();

        if (this.props.newsId !== undefined) {
            this.props.newsActions.getById(this.props.newsId);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.news !== undefined) {
            let data = nextProps.news;

            this.setState({
                Id: data.Id,
                Name: data.Title,
                ShortDescription: data.Short,
                FullDescription: data.Full,
                Published: data.Published,
                CategoryId: data.CategoryId,
                ImageUrl: data.ImageUrl
            });

            $('#fulldescription').summernote('code', data.Full);
        }
    }

    handleChangeName(event) {
        this.setState({ Name: event.target.value });
    }

    handleChangeShortDescription(event) {
        this.setState({ ShortDescription: event.target.value });
    }

    handleChangeFullDescription(event) {
        this.setState({ FullDescription: event.target.value });
    }

    handleChangeCategoryId(event) {
        this.setState({ CategoryId: event.target.value });
    }

    handlePublished(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({ Published: value });
    }

    handleUploadFile = (event) => {
        const data = new FormData();
        data.append('file', event.target.files[0]);

        axios.post('http://192.168.100.200:88/api/upload/image', data,
            {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }
            }).then((response) => {
                this.setState({ ImageUrl: response.data });
            });
    }

    onSave(event) {
        event.preventDefault();

        if (!$('#editForm').valid()) {
            return;
        }

        const news = {
            Id: this.state.Id,
            Title: this.state.Name,
            Short: this.state.ShortDescription,
            Full: $('#fulldescription').summernote('code'),
            Published: this.state.Published,
            CategoryId: this.state.CategoryId,
            ImageUrl: this.state.ImageUrl
        };

        if (news.Id !== 0) {
            this.props.newsActions.updateNews(news)
                .then(() => {
                    toastr.success("Cập nhật thành công");
                    this.redirect();
                })
                .catch(error => {
                    toastr.error(error);
                });
        }
        else {
            this.props.newsActions.saveNews(news)
                .then(() => {
                    toastr.success("Thêm mới thành công");
                    this.redirect();
                })
                .catch(error => {
                    toastr.error(error);
                });
        }
    }

    redirect() {
        this.context.router.push('/news');
    }

    goBack() {
        this.context.router.push('/news');
    }

    render() {
        const { categoriesNews } = this.props;

        return (
            <div id="page-wrapper">
                <div className="row">
                    <div className="col-sm-6">
                        <h1 className="page-header">
                            Thêm mới tin tức
                            <small><i className="fa fa-arrow-circle-left"></i>
                                <a href="javascript:void(0)" onClick={this.goBack.bind(this)}>Quay lại danh sách</a>
                            </small>
                        </h1>
                    </div>
                </div>
                <form className="form-horizontal" name="editForm" id="editForm">
                    <div className="form-group">
                        <label className="col-sm-2 col-md-2 control-label">Nhóm cha:</label>
                        <div className="col-sm-6">
                            <select className="form-control" name="categoryId" id="categoryId" value={this.state.CategoryId} onChange={this.handleChangeCategoryId}>
                                <option value="">
                                    Chọn nhóm tin
                                </option>
                                {categoriesNews.map(function (item, key) {
                                    return (
                                        <option key={key} value={item.Id}>{item.Name}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 col-md-2 control-label">Tên:</label>
                        <div className="col-sm-6">
                            <input className="form-control" name="name" id="name" value={this.state.Name} type="text" onChange={this.handleChangeName} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 col-md-2 control-label">Ảnh:</label>
                        <div className="col-sm-4">
                            {console.log(this.state.ImageUrl)}
                            {(this.state.ImageUrl === '' || this.state.ImageUrl === null ? '' :
                                <img src={"http://192.168.100.200:88/" + this.state.ImageUrl} alt="img-product" height="80" />)}
                            <input type="file" onChange={this.handleUploadFile} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 col-md-2 control-label">Nội dung tóm tắt:</label>
                        <div className="col-sm-6">
                            <textarea className="form-control" name="shortdescription" id="shortdescription" value={this.state.ShortDescription} onChange={this.handleChangeShortDescription}></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 col-md-2 control-label">Nội dung đầy đủ:</label>
                        <div className="col-sm-6">
                            <textarea className="form-control" name="fulldescription" id="fulldescription" value={this.state.FullDescription} onChange={this.handleChangeFullDescription}></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 col-md-2 control-label">Trạng thái:</label>
                        <div className="col-sm-6">
                            <input name="status" type="checkbox" checked={this.state.Published} onChange={this.handlePublished} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-10 col-sm-offset-2">
                            <button type="button" className="btn btn-primary" onClick={this.onSave}>Lưu</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

AddNewsPage.contextTypes = {
    router: PropTypes.object
};

function mapStateToProp(state, ownProps) {
    console.log(state);
    const id = ownProps.params.id;

    return {
        categoriesNews: state.categoriesNews.length === 0 ? [] : state.categoriesNews.categoriesNews,
        newsId: id,
        news: state.news.newsItem
    };
}

function mapDispatchToProp(dispatch) {
    return {
        newsActions: bindActionCreators(newsActions, dispatch),
        categoriesNewsActions: bindActionCreators(categoriesNewsActions, dispatch),
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(AddNewsPage);