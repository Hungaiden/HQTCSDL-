
import moment from "moment";
import Account from "../models/account.model.js";

export const getAllAccounts = async ({
  status,
  keyword,
  sortKey,
  sortValue,
  page = 1,
  limit = 4
}) => {
  try {
    const find = {
      deleted: false
    };

    // Filter by status
    if (status) {
      find.status = status;
    }

    // Search by keyword
    if (keyword) {
      find.fullName = new RegExp(keyword, "i");
    }

    // Sorting
    const sort = {};
    if (sortKey && sortValue) {
      sort[sortKey] = sortValue;
    } else {
      sort["createdAt"] = "desc";
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Get total accounts for pagination
    const totalAccount = await Account.countDocuments(find);
    const totalPage = Math.ceil(totalAccount / limit);

    // Get accounts
    const accounts = await Account
      .find(find)
      .limit(limit)
      .skip(skip)
      .sort(sort);

    return {
      accounts: accounts,
      pagination: {
        totalItems: totalAccount,
        totalPages: totalPage,
        currentPage: page,
        limit
      }
    };

  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách tài khoản: " + error.message);
  }
}

export const createAccount = async (data) => {
  try {
    // Kiểm tra email đã tồn tại
    const existingAccount = await Account.findOne({
      email: data.email,
      deleted: false
    });
    if (existingAccount) {
      throw new Error("Email đã tồn tại!");
    }

    const account = new Account(data);
    await account.save();
    return account;
  } catch (error) {
    throw new Error("Lỗi khi tạo tài khoản: " + error.message);
  }
}

export const updateAccount = async (id, data) => {
  try {
    // Validate id exists
    const existingAccount = await Account.findOne({
      _id: id,
      deleted: false
    });

    if (!existingAccount) {
      throw new Error("Không tìm thấy tài khoản!");
    }

    // Nếu update email, kiểm tra email mới có trùng không
    if (data.email && data.email !== existingAccount.email) {
      const emailExists = await Account.findOne({
        email: data.email,
        deleted: false,
        _id: {
          $ne: id
        }
      });
      if (emailExists) {
        throw new Error("Email đã tồn tại!");
      }
    }

    const updatedAccount = await Account.findByIdAndUpdate(
      id,
      data, {
        new: true
      }
    );

    return updatedAccount;
  } catch (error) {
    throw new Error("Lỗi khi cập nhật tài khoản: " + error.message);
  }
}

export const deleteAccount = async (id) => {
  try {
    const deletedAccount = await Account.findOneAndUpdate({
      _id: id,
      deleted: false
    }, {
      deleted: true,
      deletedAt: new Date()
    }, {
      new: true
    });

    if (!deletedAccount) {
      throw new Error("Không tìm thấy tài khoản!");
    }

    return deletedAccount;
  } catch (error) {
    throw new Error("Lỗi khi xóa tài khoản: " + error.message);
  }
}