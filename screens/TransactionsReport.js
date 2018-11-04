import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  StyleSheet,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { getTransactions } from "../redux/actions/apiActions";
import CardView from "react-native-cardview";
import { colors } from "../common/variables";
import Modal from "react-native-modal";
import Loading from "../components/Loading";
import moment from "moment";
import "moment/locale/tr";
import TransactionReportItem from "../components/TransactionReportItem";
import DateDropdown from "./DateDropdown";
import CustomDropdown from "./CustomDropdown";
import {
  RecyclerListView,
  LayoutProvider,
  DataProvider
} from "recyclerlistview";
let { height, width } = Dimensions.get("window");

moment.locale("tr");

class TransactionsReport extends Component {
  constructor(props) {
    super(props);
    this.prepareDataProvider = this.prepareDataProvider.bind(this);
    const provider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    }).cloneWithRows([]);
    this._layoutProvider = new LayoutProvider((type, dim) => {
      dim.width = width;
      dim.height = 90;
    });
    this.state = {
      receiptIsVisible: false,
      receiptUrl: "",
      startDate: "",
      endDate: "",
      tur: "",
      kiraci: "",
      dataProvider: provider,
      filteredData: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.transactions != nextProps.transactions) {
      this.setState({ filteredData: nextProps.transactions });
      this.prepareDataProvider(nextProps.transactions);
    }
  }

  prepareDataProvider(transactions) {
    const provider = this.state.dataProvider.cloneWithRows(transactions);

    this._layoutProvider = new LayoutProvider(
      i => {
        return provider.getDataForIndex(i);
      },
      (type, dim) => {
        dim.width = width;
        dim.height = 80;
      }
    );
    debugger;
    this.setState({ dataProvider: provider });
  }

  _renderRow(type, data) {
    return (
      <TransactionReportItem
        item={data}
        receiptPress={dekont =>
          this.setState({
            receiptIsVisible: true,
            receiptUrl: dekont
          })
        }
      />
    );
  }

  componentWillMount() {
    const { transactions, token } = this.props;
    if (isEmpty(transactions)) this.props.getTransactions(token);

    Image.getSize(
      "http://online.keystoneyonetim.com/media/belgeler/2018/01/A1_DR_6_1200_DEPOZITO__1200_KIRA_QF65XWj.jpg",
      (width, height) => {
        if (this.props.width && !this.props.height) {
          this.setState({
            width: this.props.width,
            height: height * (this.props.width / width)
          });
        } else if (!this.props.width && this.props.height) {
          this.setState({
            width: width * (this.props.height / height),
            height: this.props.height
          });
        } else {
          this.setState({ width: width, height: height });
        }
      }
    );
  }

  apply() {
    const { tur, startDate, endDate, kiraci } = this.state;

    const filteredData = this.props.transactions.filter(transaction => {
      if (tur && tur != "Seçiniz") {
        if (transaction.tur != tur) return;
      }
      const transactionDate = Number(
        moment(transaction.tarih, "YYYY-MM-DD").format("x")
      );
      if (startDate && !endDate && startDate != "Seçiniz") {
        if (
          Number(moment(startDate, "DD-MM-YYYY").format("x")) > transactionDate
        ) {
          return;
        }
      }
      if (endDate && !startDate && endDate != "Seçiniz") {
        if (
          Number(moment(endDate, "DD-MM-YYYY").format("x")) < transactionDate
        ) {
          return;
        }
      }
      if (
        startDate &&
        endDate &&
        startDate != "Seçiniz" &&
        endDate != "Seçiniz"
      ) {
        if (
          Number(moment(startDate, "DD-MM-YYYY").format("x")) <
            transactionDate &&
          Number(moment(endDate, "DD-MM-YYYY").format("x")) > transactionDate
        ) {
        } else {
          return;
        }
      }
      return transaction;
    });

    debugger;
    this.setState({ filteredData });
    if (!isEmpty(filteredData)) this.prepareDataProvider(filteredData);
  }

  clearAllFilter() {
    this.setState({ startDate: "", endDate: "", tur: "", kiraci: "" });
  }

  render() {
    const {
      receiptIsVisible,
      width,
      height,
      receiptUrl,
      startDate,
      endDate
    } = this.state;
    const { transactions, getTransactionsAreLoading } = this.props;
    return (
      <View style={styles.container}>
        <Loading show={getTransactionsAreLoading} />
        <DateDropdown
          initial={startDate}
          title="Başlangıç Tarihi"
          onDateSelect={startDate => {
            this.setState({ startDate: startDate });
          }}
        />
        <View style={{ marginTop: 2 }}>
          <DateDropdown
            initial={endDate}
            title="Bitiş Tarihi"
            onDateSelect={endDate => {
              this.setState({ endDate: endDate });
            }}
          />
        </View>
        <View style={{ marginTop: 2 }}>
          <CustomDropdown
            title="Tür"
            data={["Seçiniz", "Kira", "Depozito"]}
            onSelect={value => {
              this.setState({ tur: value });
            }}
          />
        </View>
        {/* <TouchableHighlight
          underlayColor={colors.primary}
          onPress={this.clearAllFilter.bind(this)}
          style={{
            marginTop: 20,
            backgroundColor: colors.primary,
            height: 40,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            Tüm Filtreleri Temizle
          </Text>
        </TouchableHighlight> */}
        <TouchableHighlight
          underlayColor={colors.primary}
          onPress={this.apply.bind(this)}
          style={{
            marginTop: 1,
            backgroundColor: colors.primary,
            height: 40,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Uygula</Text>
        </TouchableHighlight>
        <FlatList
          data={this.state.filteredData}
          renderItem={({ item }) => {
            return (
              <TransactionReportItem
                item={item}
                receiptPress={dekont =>
                  this.setState({
                    receiptIsVisible: true,
                    receiptUrl: dekont
                  })
                }
              />
            );
          }}
        />

        <Modal isVisible={receiptIsVisible}>
          <View>
            <Image
              resizeMode="contain"
              style={{
                height: height
              }}
              source={{
                uri: receiptUrl
              }}
            />
          </View>
          <View style={{ position: "absolute", top: 20, right: 0 }}>
            <TouchableHighlight
              style={{ width: 50, height: 50 }}
              underlayColor="transparent"
              onPress={() => this.setState({ receiptIsVisible: false })}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../images/close.png")}
              />
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgColor }
});

function mapStateToProps(state) {
  return {
    transactions: state.api.transactions,
    token: state.api.token,
    getTransactionsAreLoading: state.api.getTransactionsAreLoading
  };
}

export default connect(
  mapStateToProps,
  { getTransactions }
)(TransactionsReport);
