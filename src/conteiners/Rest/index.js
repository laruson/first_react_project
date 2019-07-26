import React, {Component} from 'react';
import {ScrollView, View, ProgressBarAndroid} from 'react-native';
import {getMusicAlbums} from "../../action/albums";
import {connect} from 'react-redux';
import RestView from '../../components/RestView/index';
import * as restConst from '../../constants/restConst'

class Rest extends Component {
    componentDidMount(): void {
        this.props.getAlbum()
    }

    render() {
        return (
            <ScrollView>
                {this.renderContent()}
            </ScrollView>
        );
    }

    renderContent() {
        if (!this.props.isLoading) {
            return (
                <View>
                    <RestView restType={restConst.REQUEST} restContent={JSON.stringify(this.props.request)}/>
                    <RestView restType={restConst.RESPONSE} restContent={JSON.stringify(this.props.response)}/>
                </View>
            );
        }
        return <ProgressBarAndroid/>

    }
}

const mapDispatchToProps = dispatch => ({
    getAlbum: () => dispatch(getMusicAlbums())
});

const mapStateToProps = state => ({
    isLoading: state.album.isLoading,
    request: state.album.request,
    response: state.album.response
});

export default connect(mapStateToProps, mapDispatchToProps)(Rest);
